import { supabase } from "@clientSupabase";
import { TId } from "@queries/sportQueries/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateTabValue } from "@utils/array/array";

export const useGet = <TData>(key: string, table: string) => {
  const { data, isPending } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await supabase.from(table).select();
      return res.data as TData[];
    },
    staleTime: Infinity,
  });

  return { data, isPending };
};

export const usePost = <TData, TPayload>(
  key: string,
  table: string,
  successCallback?: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (payload: TPayload) => {
      const res = await supabase.from(table).insert(payload).select();
      return res.data as TData[];
    },
    onSuccess: (newData: TData[]) => {
      queryClient.setQueryData([key], (oldData: TData[]) => {
        return [...oldData, ...newData];
      });
      if (successCallback) successCallback();
    },
  });

  return { mutate, isPending, isSuccess };
};

export const usePatch = <TData extends TId, TPayload extends TId>(
  key: string,
  table: string,
  successCallback?: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (payload: TPayload) => {
      const res = await supabase
        .from(table)
        .update(payload)
        .eq("id", payload.id)
        .select();

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

  return { mutate, isPending, isSuccess };
};

export const useDelete = <TData extends TId>(key: string, table: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: TId) => {
      const res = await supabase.from(table).delete().eq("id", payload.id).select();

      return res.data as TData[];
    },
    onSuccess: (updatedData: TData[]) => {
      queryClient.setQueryData([key], (oldData: TData[]) => {
        const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
        return updateTabValue(oldData, idx);
      });
    },
  });

  return { mutate, isPending };
};
