import { TId, TMuscles, TMusclesPayload, TPayload, TQueryCallback } from "./types.ts";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";

const musclesKey = "dataMuscles";
const musclesTable = "muscles";

export const useGetMuscles = () => useGet<TMuscles>(musclesKey, musclesTable);

export const usePostMuscles = (callback: TQueryCallback) =>
  usePost<TMuscles, TPayload<TMuscles>>(musclesKey, musclesTable, callback);

export const usePatchMuscles = (successCallback?: () => void) =>
  usePatch<TMuscles, TPayload<TMuscles> & TId>(musclesKey, musclesTable, successCallback);

export const useDeleteMuscles = () => useDelete<TMuscles>(musclesKey, musclesTable);
