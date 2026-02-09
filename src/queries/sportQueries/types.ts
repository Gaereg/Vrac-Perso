import { enumMuscleGrp } from "@enums";

export type TTypesExo = {
  id: number;
  created_at: string;
  name: string;
};

export type TMuscles = {
  id: number;
  created_at: string;
  name: string;
  muscle_group: enumMuscleGrp;
};

export type TExo = {
  name: string;
  description: string;
  grp_muscles: string[];
  id: number;
  main_muscles?: string[];
  main_muscles_id: number[];
  secondary_muscles?: string[];
  secondary_muscles_id: number[];
  type_exercice: string;
  type_exercice_id: number;
  created_at: string;
};

export type TExoLinkBloc = {
  id: number;
  pause: number;
  duration: number;
  durationType: "timer" | "repetition";
};

export type TPayload<T> = Omit<T, "id" | "created_at" | "type_exercice">;

export type TPayloadExo = {
  name: string;
  description: string;
  grp_muscles: string[];
  main_muscles_id: number[];
  secondary_muscles_id: number[];
  type_exercice_id: number;
};

export type TExoPayloadTable = TPayload<
  Omit<TExo, "main_muscles_id" | "secondary_muscles_id">
>;

export type TPayloadLinkedMuscle = {
  muscle_id: number;
  exo_id: number;
  muscle_type: "SECONDARY" | "PRIMARY";
};

export type TId = { id: number };

export type TQueryCallback = {
  onSuccess?: () => void;
  onError: (error: TError) => void;
};

export type TError = { code: string; message: string };

export type TBlocExos = {
  id: number;
  created_at: string;
  name: string;
  estimated_time: number;
  exercices: TExoInBloc[];
};

export type TExoInBloc = {
  exercice: TExo;
  order: number;
  duration: number;
  is_time_duration: boolean;
  recovery_time: number;
};

export type TPayloadLinkedExoBloc = Omit<TExoInBloc, "exercice"> & {
  exercice_id: number;
  bloc_id: number;
};

export type TTables =
  | "types_exercices"
  | "exercices_join"
  | "exercices"
  | "muscles"
  | "linked_muscles"
  | "linked_exo_bloc"
  | "blocs_exercices_join"
  | "blocs_exercices";

