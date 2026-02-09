import { supabase } from "@clientSupabase";
import { TError, TId, TQueryCallback, TTables } from "@queries/sportQueries/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateTabValue } from "@utils/array/array";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasRequestError = (res: PostgrestSingleResponse<any[]>, msg: string) => {
  if (res.error) {
    throw res.error;
  }
  if (res.data.length === 0) throw { message: msg };
};

export const patchData = async <T>(
  table: TTables,
  payload: T,
  eqKey: string,
  eqValue: string | number | boolean,
) => {
  const res = await supabase.from(table).update(payload).eq(eqKey, eqValue).select();
  hasRequestError(res, "Élément à modifier n'a pas été trouvé");
  return res;
};

export const delData = async (
  table: TTables,
  eqKey: string,
  eqValue: string | number | boolean,
) => {
  const res = await supabase.from(table).delete().eq(eqKey, eqValue).select();
  if (res.error) {
    throw res.error;
  }
  return res;
};

export const postData = async <T>(table: TTables, payload: T) => {
  const res = await supabase.from(table).insert(payload).select();
  hasRequestError(res, "Erreur lors de la création de l'élément");
  return res;
};

export const useGet = <TData>(key: string, table: TTables) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await supabase.from(table).select();
      return res.data as TData[];
    },
    staleTime: Infinity,
  });

  return { data, isPending, isError, error };
};

export const usePost = <TData, TPayload>(
  key: string,
  table: TTables,
  callback: TQueryCallback,
  updateCache: boolean = true,
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (payload: TPayload) => {
      const res = await postData<TPayload>(table, payload);

      return res.data as TData[];
    },
    onSuccess: (newData: TData[]) => {
      if (updateCache) {
        queryClient.setQueryData([key], (oldData: TData[]) => {
          return [...oldData, ...newData];
        });
      }
      if (callback.onSuccess) callback.onSuccess();
    },
    onError: (err: TError) => callback.onError(err),
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export const usePatch = <TData extends TId, TPayload extends TId>(
  key: string,
  table: TTables,
  callback: TQueryCallback,
  updateCache: boolean = true,
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (payload: TPayload) => {
      const res = await patchData<TPayload>(table, payload, "id", payload.id);
      return res.data as TData[];
    },
    onSuccess: (updatedData: TData[]) => {
      if (updateCache) {
        queryClient.setQueryData([key], (oldData: TData[]) => {
          const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
          return updateTabValue(oldData, idx, updatedData[0]);
        });
      }
      if (callback.onSuccess) callback.onSuccess();
    },
    onError: (err: TError) => callback.onError(err),
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export const useDelete = <TData extends TId>(
  key: string,
  table: TTables,
  callback: TQueryCallback,
  updateCache: boolean = true,
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (id: number) => {
      const res = await delData(table, "id", id);
      return res.data as TData[];
    },
    onSuccess: (updatedData: TData[]) => {
      if (updateCache) {
        queryClient.setQueryData([key], (oldData: TData[]) => {
          const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
          return updateTabValue(oldData, idx);
        });
      }
      if (callback.onSuccess) callback.onSuccess();
    },
    onError: (err: TError) => callback.onError(err),
  });

  return { mutate, isPending, isSuccess, isError, error };
};
