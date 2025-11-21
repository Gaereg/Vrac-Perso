import { TId, TMuscles, TMusclesPayload } from "./types.ts";
import { useDelete, useGet, usePatch, usePost } from "@queries/sportQueries/utils.ts";

const musclesKey = "dataMuscles";
const musclesTable = "muscles";

export const useGetMuscles = () => useGet<TMuscles>(musclesKey, musclesTable);

export const usePostMuscles = (successCallback?: () => void) =>
  usePost<TMuscles, TMusclesPayload>(musclesKey, musclesTable, successCallback);

export const usePatchMuscles = (successCallback?: () => void) =>
  usePatch<TMuscles, TMusclesPayload & TId>(musclesKey, musclesTable, successCallback);

export const useDeleteMuscles = () => useDelete<TMuscles>(musclesKey, musclesTable);
