import { supabase } from "@clientSupabase";
import { enumMuscleGrp } from "@enums";
import { exoTable, exoTableJoin, linkedMusclesTable } from "@queries/sportQueries/table";
import {
  TExo,
  TExoPayloadTable,
  TId,
  TPayloadExo,
  TPayloadLinkedMuscle,
  TQueryCallback,
} from "@queries/sportQueries/types";
import {
  delData,
  patchData,
  postData,
  useDelete,
  useGet,
  usePatch,
} from "@queries/sportQueries/utils.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

const exoKey = "dataExos";
const exoKeyFiltered = "dataFilteredExos";

export const useGetExos = () => useGet<TExo>(exoKey, exoTableJoin);

const cleanTabNumber = (
  tab: (number | null)[],
  exoId: number,
  tabPrimary?: number[],
): TPayloadLinkedMuscle[] => {
  const filteredTab = tab.filter((el) => {
    return typeof el === "number" && (!tabPrimary || !tabPrimary.includes(el));
  }) as number[];
  return filteredTab.map((muscleId) => ({
    muscle_id: muscleId,
    exo_id: exoId,
    muscle_type: tabPrimary ? "SECONDARY" : "PRIMARY",
  }));
};

export const useGetFilteredExos = ({
  typeExo,
  muscleGrp,
}: {
  typeExo?: number;
  muscleGrp?: enumMuscleGrp;
}) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [exoKeyFiltered, typeExo, muscleGrp],
    queryFn: async () => {
      let query = supabase.from(exoTableJoin).select();
      if (typeExo) query = query.eq("type_exercice_id", typeExo);
      if (muscleGrp) query = query.contains("grp_muscles", [muscleGrp]);

      const res = await query;
      return res.data as TExo[];
    },
    staleTime: Infinity,
  });

  return { data, isPending, isError, error };
};

export const usePostExo = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TPayloadExo) => {
      const { main_muscles_id, secondary_muscles_id, ...cleanPayload } = payload;

      const resPostExo = await postData(exoTable, cleanPayload);
      if (!resPostExo.data) throw { message: "Erreur lors de la création de l'exercice" };

      const exoId = resPostExo.data[0].id;
      const musclesPayload = [
        ...cleanTabNumber(main_muscles_id, exoId),
        ...cleanTabNumber(secondary_muscles_id, exoId, main_muscles_id),
      ];

      const resLinkedMuscles = await postData(linkedMusclesTable, musclesPayload);

      return [resPostExo, resLinkedMuscles];
    },
    onSuccess: async () => {
      if (callback.onSuccess) callback.onSuccess();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [exoKey] }),
        queryClient.invalidateQueries({ queryKey: [exoKeyFiltered] }),
      ]);
    },
  });
};

export const usePatchExo = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TExo) => {
      const { main_muscles_id, secondary_muscles_id, ...cleanPayload } = payload;
      const musclesPayload = [
        ...cleanTabNumber(main_muscles_id, payload.id),
        ...cleanTabNumber(secondary_muscles_id, payload.id, main_muscles_id),
      ];

      const [resPatchExo, resDelLinkedMuscles] = await Promise.all([
        patchData(exoTable, cleanPayload, "id", payload.id),
        delData(linkedMusclesTable, "exo_id", payload.id),
      ]);

      const resPostLinkedMuscles = await postData(linkedMusclesTable, musclesPayload);

      return [resPatchExo, resDelLinkedMuscles, resPostLinkedMuscles];
    },
    onSuccess: async () => {
      if (callback.onSuccess) callback.onSuccess();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [exoKey] }),
        queryClient.invalidateQueries({ queryKey: [exoKeyFiltered] }),
      ]);
    },
  });
}

export const useDeleteExo = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const [resDelExo, resDelLinkedMuscles] = await Promise.all([
        delData(exoTable, "id", id),
        delData(linkedMusclesTable, "exo_id", id),
      ]);

      return [resDelExo, resDelLinkedMuscles];
    },
    onSuccess: async () => {
      if (callback.onSuccess) callback.onSuccess();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [exoKey] }),
        queryClient.invalidateQueries({ queryKey: [exoKeyFiltered] }),
      ]);
    },
  });
}
