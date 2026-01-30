import { enumMuscleGrp } from "@enums";

export type TTypesExo = {
  id: number;
  created_at: Date;
  name: string;
};

export type TMuscles = {
  id: number;
  created_at: Date;
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
  created_at: Date;
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
