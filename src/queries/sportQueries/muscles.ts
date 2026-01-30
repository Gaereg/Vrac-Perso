import { useMutation } from "@tanstack/react-query";
import { TId, TMuscles, TPayload, TQueryCallback } from "./types.ts";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";
import { supabase } from "@clientSupabase";
import { linkedMusclesTable, musclesTable } from "@queries/sportQueries/table.ts";

const musclesKey = "dataMuscles";

export const useGetMuscles = () => useGet<TMuscles>(musclesKey, musclesTable);

export const usePostMuscles = (callback: TQueryCallback) =>
  usePost<TMuscles, TPayload<TMuscles>>(musclesKey, musclesTable, callback);

export const usePatchMuscles = (callback: TQueryCallback) =>
  usePatch<TMuscles, TPayload<TMuscles> & TId>(musclesKey, musclesTable, callback);

export const useDeleteMuscles = (callback: TQueryCallback) => {
  const {
    mutate: muscleMutate,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDelete<TMuscles>(musclesKey, musclesTable, callback);

  const { mutate: linkedMuscleMutate } = useMutation({
    mutationFn: async (muscleId: number) =>
      await supabase.from(linkedMusclesTable).delete().eq("muscle_id", muscleId),
  });

  const mutate = (muscleId: number) => {
    muscleMutate(muscleId);
    linkedMuscleMutate(muscleId);
  }

  return {mutate, isPending, isSuccess, isError, error}
};
