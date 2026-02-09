import { TId, TPayload, TQueryCallback, TTypesExo } from "./types.ts";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";
import { typesExoTable } from "@queries/sportQueries/table.ts";

const typesExoKey = "dataTypesExo";

export const useGetTypesExo = () => useGet<TTypesExo>(typesExoKey, typesExoTable);

export const usePostTypesExo = (callback: TQueryCallback) =>
  usePost<TTypesExo, TPayload<TTypesExo>>(typesExoKey, typesExoTable, callback);

export const usePatchTypesExo = (callback: TQueryCallback) =>
  usePatch<TTypesExo, TPayload<TTypesExo> & TId>(typesExoKey, typesExoTable, callback);

export const useDeleteTypesExo = (callback: TQueryCallback) =>
  useDelete<TTypesExo>(typesExoKey, typesExoTable, callback);
