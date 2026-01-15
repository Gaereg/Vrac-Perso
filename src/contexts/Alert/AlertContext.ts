import { createContext, useContext } from "react";
import { TAlertContext, TAlertDispatch } from "src/contexts/Alert/types";

export const AlertContext = createContext<TAlertContext>({
  isError: false,
  msgError: "",
  isSuccess: false,
  msgSuccess: "",
});
export const AlertDispatchContext = createContext<TAlertDispatch>({
  addError: () => {},
  addSuccess: () => {},
  closeAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);
export const useAlertDispatch = () => useContext(AlertDispatchContext);
