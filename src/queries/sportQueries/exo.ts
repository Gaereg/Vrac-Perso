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
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

const exoKey = "dataExos";
const exoKeyFiltered = "dataFilteredExos";

export const useGetExos = () => useGet<TExo>(exoKey, exoTableJoin);

const cleanTabNumber = (tab: (number | null)[]): number[] =>
  tab.filter((el) => typeof el === "number");

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

  const {
    mutate: exoMutate,
    isPending,
    isSuccess,
    isError: isExoError,
    error: exoError,
  } = usePost<TExo, TExoPayloadTable>(exoKey, exoTable, callback, false);

  const {
    mutate: linkedMuscleMutate,
    isError: isMuscleError,
    error: muscleError,
  } = useMutation({
    mutationFn: async (payload: TPayloadLinkedMuscle) => {
      return supabase.from(linkedMusclesTable).insert(payload);
    },
  });

  const mutate = (payload: TPayloadExo) => {
    const { main_muscles_id, secondary_muscles_id, ...cleanPayload } = payload;
    exoMutate(cleanPayload, {
      onSuccess: (newExo) => {
        if (newExo) {
          const { id } = newExo[0];
          [
            cleanTabNumber(main_muscles_id),
            cleanTabNumber(secondary_muscles_id),
          ]?.forEach((tab, idx) => {
            tab?.forEach((musclesId) =>
              linkedMuscleMutate(
                {
                  muscle_id: musclesId as number,
                  exo_id: id,
                  muscle_type: idx === 0 ? "PRIMARY" : "SECONDARY",
                },
                {
                  onSuccess: async () => {
                    await Promise.all([
                      queryClient.invalidateQueries({ queryKey: [exoKey] }),
                      queryClient.invalidateQueries({ queryKey: [exoKeyFiltered] }),
                    ]);
                  },
                }
              )
            );
          });
        }
      },
    });
  };

  const isError = useMemo(
    () => isExoError || isMuscleError || false,
    [isExoError, isMuscleError]
  );
  const error = useMemo(() => exoError || muscleError || null, [exoError, muscleError]);

  return { mutate, isPending, isSuccess, isError, error };
};

export const usePatchExo = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  const {
    mutate: exoMutate,
    isPending,
    isSuccess,
    isError: isExoError,
    error: exoError,
  } = usePatch<TExo, TExoPayloadTable & TId>(exoKey, exoTable, callback, false);

  const { mutate: deletelinkedMutate } = useMutation({
    mutationFn: async (exo_id: number) =>
      await supabase.from(linkedMusclesTable).delete().eq("exo_id", exo_id).select(),
  });

  const {
    mutate: linkedMuscleMutate,
    isError: isMuscleError,
    error: muscleError,
  } = useMutation({
    mutationFn: async (payload: TPayloadLinkedMuscle) => {
      return supabase.from(linkedMusclesTable).insert(payload);
    },
  });

  const mutate = (payload: TPayloadExo & TId) => {
    const { main_muscles_id, secondary_muscles_id, ...cleanPayload } = payload;
    exoMutate(cleanPayload);
    deletelinkedMutate(payload.id, {
      onSuccess: () => {
        [cleanTabNumber(main_muscles_id), cleanTabNumber(secondary_muscles_id)]?.forEach(
          (tab, idx) => {
            tab?.forEach((musclesId) =>
              linkedMuscleMutate(
                {
                  muscle_id: musclesId as number,
                  exo_id: payload.id,
                  muscle_type: idx === 0 ? "PRIMARY" : "SECONDARY",
                },
                {
                  onSuccess: async () => {
                    await Promise.all([
                      queryClient.invalidateQueries({ queryKey: [exoKey] }),
                      queryClient.invalidateQueries({ queryKey: [exoKeyFiltered] }),
                    ]);
                  },
                }
              )
            );
          }
        );
      },
    });
  };

  const isError = useMemo(
    () => isExoError || isMuscleError || false,
    [isExoError, isMuscleError]
  );
  const error = useMemo(() => exoError || muscleError || null, [exoError, muscleError]);

  return { mutate, isPending, isSuccess, isError, error };
};

export const useDeleteExo = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  const {
    mutate: exoMutate,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDelete<TExo>(exoKey, exoTable, callback, false);

  const { mutate: deletelinkedMutate } = useMutation({
    mutationFn: async (exo_id: number) =>
      await supabase.from(linkedMusclesTable).delete().eq("exo_id", exo_id).select(),
  });

  const mutate = (id: number) => {
    exoMutate(id);
    deletelinkedMutate(id, {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [exoKey] }),
          queryClient.invalidateQueries({ queryKey: [exoKeyFiltered] }),
        ]);
      },
    });
  };

  return { mutate, isPending, isSuccess, isError, error };
};
