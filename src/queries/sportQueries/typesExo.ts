import { supabase } from "@clientSupabase";
import { TTypesExo } from "./typesExo.types.ts";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateTabValue } from "@utils/array/array";

const typesExoKey = "dataTypesExo";
const typesExoTable = "types_exercices";

export const useGetTypesExo = () => {
  const { data, isPending } = useQuery({
    queryKey: [typesExoKey],
    queryFn: async () => {
      const res = await supabase.from(typesExoTable).select();
      return res.data as TTypesExo[];
    },
    staleTime: Infinity,
  });

  return { data, isPending };
};

export const usePostTypesExo = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { name: string }) => {
      const res = await supabase
        .from(typesExoTable)
        .insert({ name: payload.name })
        .select();
      return res.data as TTypesExo[];
    },
    onSuccess: (newData: TTypesExo[]) => {
      queryClient.setQueryData([typesExoKey], (oldData: TTypesExo[]) => {
        return [...oldData, ...newData];
      });
    },
  });

  return { mutate, isPending };
};

export const usePatchTypesExo = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { name: string; id: number }) => {
      const res = await supabase
        .from(typesExoTable)
        .update({ name: payload.name })
        .eq("id", payload.id)
        .select();

      return res.data as TTypesExo[];
    },
    onSuccess: (updatedData: TTypesExo[]) => {
      queryClient.setQueryData([typesExoKey], (oldData: TTypesExo[]) => {
        const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
        return updateTabValue(oldData, idx, updatedData[0]);
      });
    },
  });

  return { mutate, isPending };
};

export const useDeleteTypesExo = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { id: number }) => {
      const res = await supabase
        .from(typesExoTable)
        .delete()
        .eq("id", payload.id)
        .select()

      return res.data as TTypesExo[];
    },
    onSuccess: (updatedData: TTypesExo[]) => {
      queryClient.setQueryData([typesExoKey], (oldData: TTypesExo[]) => {
        console.log(updatedData, oldData)
        const idx = oldData.findIndex((a) => a.id === updatedData[0].id);
        return updateTabValue(oldData, idx);
      });
    },
  });

  return { mutate, isPending };
};

