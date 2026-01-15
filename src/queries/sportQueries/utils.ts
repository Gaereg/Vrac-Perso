import { supabase } from "@clientSupabase";
import { TError, TId, TQueryCallback } from "@queries/sportQueries/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateTabValue } from "@utils/array/array";

export const useGet = <TData>(key: string, table: string) => {
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
  table: string,
  callback: TQueryCallback
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (payload: TPayload) => {
      const res = await supabase.from(table).insert(payload).select();
      if (res.error) {
        throw res.error;
      }
      return res.data as TData[];
    },
    onSuccess: (newData: TData[]) => {
      queryClient.setQueryData([key], (oldData: TData[]) => {
        return [...oldData, ...newData];
      });
      if (callback.onSuccess) callback.onSuccess();
    },
    onError: (err: TError) => callback.onError(err)
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export const usePatch = <TData extends TId, TPayload extends TId>(
  key: string,
  table: string,
  successCallback?: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (payload: TPayload) => {
      const res = await supabase
        .from(table)
        .update(payload)
        .eq("id", payload.id)
        .select();

      if (res.error) {
        throw res.error;
      }

      return res.data as TData[];
    },
    onSuccess: (updatedData: TData[]) => {
      queryClient.setQueryData([key], (oldData: TData[]) => {
        const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
        return updateTabValue(oldData, idx, updatedData[0]);
      });
      if (successCallback) successCallback();
    },
  });

  return { mutate, isPending, isSuccess, isError, error };
};

export const useDelete = <TData extends TId>(key: string, table: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (payload: TId) => {
      const res = await supabase.from(table).delete().eq("id", payload.id).select();
      if (res.error) {
        throw res.error;
      }
      return res.data as TData[];
    },
    onSuccess: (updatedData: TData[]) => {
      queryClient.setQueryData([key], (oldData: TData[]) => {
        const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
        return updateTabValue(oldData, idx);
      });
    },
  });

  return { mutate, isPending, isError, error };
};
