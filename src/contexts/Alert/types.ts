import { TError } from "@queries/sportQueries/types";
import { CodeErr } from "src/contexts/Alert/CodeErr";

export type TAlertContext = {
  isError: boolean;
  msgError: string;
  isSuccess: boolean;
  msgSuccess: string;
};

export type TAlertDispatch = {
  addError: (err: TAlertError) => void;
  addSuccess: (msg: string) => void;
  closeAlert: () => void;
};

export type TAlertError = TError & { table: keyof typeof CodeErr };

export type TCodeErr = {
  [type in "typesExo" | "muscles" | "exercices"]: {
    [index: string]: string;
  };
};
