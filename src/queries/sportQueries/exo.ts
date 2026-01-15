import { supabase } from "@clientSupabase";
import {
  TExo,
  TExoPayloadTable,
  TPayload,
  TPayloadLinkedMuscle,
  TQueryCallback,
} from "@queries/sportQueries/types";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

const exoKey = "dataExos";
const exoTableJoin = "exercices_join";
const exoTable = "exercices";

const linkedMusclesTable = "linked_muscles";

export const useGetExos = () => useGet<TExo>(exoKey, exoTableJoin);

export const usePostExo = (callback: TQueryCallback) => {
  const queryClient = useQueryClient();

  const {
    mutate: exoMutate,
    isPending,
    isSuccess,
    isError: isExoError,
    error: exoError,
  } = usePost<TExo, TExoPayloadTable>(exoKey, exoTable, callback);

  const {
    mutate: linkedMuscleMutate,
    isError: isMuscleError,
    error: muscleError,
  } = useMutation({
    mutationFn: async (payload: TPayloadLinkedMuscle) => {
      return supabase.from(linkedMusclesTable).insert(payload);
    },
  });

  const mutate = (payload: TPayload<TExo>) => {
    const { main_muscles, secondary_muscles, ...cleanPayload } = payload;
    exoMutate(cleanPayload, {
      onSuccess: (newExo) => {
        if (newExo) {
          const { id } = newExo[0];
          [main_muscles, secondary_muscles]?.forEach((tab, idx) => {
            tab?.forEach((musclesId) =>
              linkedMuscleMutate(
                {
                  muscle_id: musclesId as number,
                  exo_id: id,
                  muscle_type: idx === 0 ? "PRIMARY" : "SECONDARY",
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: [exoKey] });
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
