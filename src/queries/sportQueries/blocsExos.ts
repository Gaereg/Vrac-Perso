import {
  TBlocExos,
  TError,
  TExoInBloc,
  TQueryCallback,
  TPayload,
} from "@queries/sportQueries/types";
import {
  delData,
  patchData,
  postData,
  useGet,
} from "@queries/sportQueries/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const blocsExosKey = "dataBlocsExos";

const blocsExosJoinTable = "blocs_exercices_join";
const blocsExosTable = "blocs_exercices";
const linkedExoBlocTable = "linked_exo_bloc";

const parseExoInBloc = (exercices: TExoInBloc[], blocId: number) => {
  const filteredExo = exercices.filter((exo) => exo.exercice !== null) as TExoInBloc[];
  return filteredExo.map((exo) => {
    const { exercice, ...exoPayload } = exo;
    return {
      ...exoPayload,
      bloc_id: blocId,
      exercice_id: exercice.id,
    };
  });
};

export const useGetBlocExos = () => {
  const { data, ...rest } = useGet<TBlocExos>(blocsExosKey, blocsExosJoinTable);
  const orderedData = data?.map((bloc) => {
    return {
      ...bloc,
      exercices: bloc.exercices.sort((a, b) => {
        if (a.order > b.order) return 1;
        else if (a.order < b.order) return -1;
        return 0;
      }),
    };
  });
  return { ...rest, data: orderedData };
};

export const usePostBlocExos = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TPayload<TBlocExos>) => {
      const blocPayload = { name: payload.name, estimated_time: payload.estimated_time };

      const resPostBloc = await postData(blocsExosTable, blocPayload);
      if (!resPostBloc.data)
        throw { message: "Erreur lors de la création du bloc d'exercices" };

      const linkedExoBlocPayload = parseExoInBloc(
        payload.exercices,
        resPostBloc.data[0].id,
      );
      if (linkedExoBlocPayload.length === 0) return resPostBloc;

      const resPostLinkedExoBloc = await postData(
        linkedExoBlocTable,
        linkedExoBlocPayload,
      );

      return [resPostBloc, resPostLinkedExoBloc];
    },
    onSuccess: () => {
      if (callback.onSuccess) callback.onSuccess();
      queryClient.invalidateQueries({ queryKey: [blocsExosKey] });
    },
    onError: (err: TError) => callback.onError(err),
  });
};

export const usePatchBlocExos = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TBlocExos) => {
      const blocPayload = { name: payload.name, estimated_time: payload.estimated_time };
      const linkedExoBlocPayload = parseExoInBloc(payload.exercices, payload.id);

      const [resPatchBloc, resDelLinkedExoBloc] = await Promise.all([
        patchData(blocsExosTable, blocPayload, "id", payload.id),
        delData(linkedExoBlocTable, "bloc_id", payload.id),
      ]);
      if (linkedExoBlocPayload.length === 0) return [resPatchBloc, resDelLinkedExoBloc];

      const resPostLinkedExoBloc = await postData(
        linkedExoBlocTable,
        linkedExoBlocPayload,
      );

      return [resPatchBloc, resDelLinkedExoBloc, resPostLinkedExoBloc];
    },
    onSuccess: () => {
      if (callback.onSuccess) callback.onSuccess();
      queryClient.invalidateQueries({ queryKey: [blocsExosKey] });
    },
    onError: (err: TError) => callback.onError(err),
  });
};

export const useDeleteBlocExos = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bloc_id: number) => {
      const [resDelBloc, resDelLinkedExoBloc] = await Promise.all([
        delData(blocsExosTable, "id", bloc_id),
        delData(linkedExoBlocTable, "bloc_id", bloc_id),
      ]);

      return [resDelBloc, resDelLinkedExoBloc];
    },
    onSuccess: () => {
      if (callback.onSuccess) callback.onSuccess();
      queryClient.invalidateQueries({ queryKey: [blocsExosKey] });
    },
    onError: (err: TError) => callback.onError(err),
  });
};
