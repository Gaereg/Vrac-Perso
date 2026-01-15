import { TId, TPayload, TQueryCallback, TTypesExo, TTypesExoPayload } from "./types.ts";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";

const typesExoKey = "dataTypesExo";
const typesExoTable = "types_exercices";

export const useGetTypesExo = () => useGet<TTypesExo>(typesExoKey, typesExoTable);

export const usePostTypesExo = (callback: TQueryCallback) =>
  usePost<TTypesExo, TPayload<TTypesExo>>(typesExoKey, typesExoTable, callback);

export const usePatchTypesExo = (successCallback?: () => void) =>
  usePatch<TTypesExo, TPayload<TTypesExo> & TId>(
    typesExoKey,
    typesExoTable,
    successCallback
  );

export const useDeleteTypesExo = () => useDelete<TTypesExo>(typesExoKey, typesExoTable);
