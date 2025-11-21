import { TId, TTypesExo, TTypesExoPayload } from "./types.ts";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";

const typesExoKey = "dataTypesExo";
const typesExoTable = "types_exercices";

export const useGetTypesExo = () => useGet<TTypesExo>(typesExoKey, typesExoTable);

export const usePostTypesExo = (successCallback?: () => void) =>
  usePost<TTypesExo, TTypesExoPayload>(typesExoKey, typesExoTable, successCallback);

export const usePatchTypesExo = (successCallback?: () => void) =>
  usePatch<TTypesExo, TTypesExoPayload & TId>(
    typesExoKey,
    typesExoTable,
    successCallback
  );

export const useDeleteTypesExo = () => useDelete<TTypesExo>(typesExoKey, typesExoTable);
