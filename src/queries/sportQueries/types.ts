import { enumMuscleGrp } from "@enums";
import { CodeErr } from "src/contexts/Alert/CodeErr";

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
  main_muscles?: string[] | number[];
  secondary_muscles?: string[] | number[];
  type_exercice: string | number;
  created_at: Date;
};

export type TPayload<T> = Omit<T, "id" | "created_at">;

export type TExoPayloadTable = TPayload<Omit<TExo, "main_muscles" | "secondary_muscles">>;

export type TPayloadLinkedMuscle = {
  muscle_id: number;
  exo_id: number;
  muscle_type: 'SECONDARY' | 'PRIMARY'
}

export type TId = { id: number };

export type TQueryCallback = {
  onSuccess?: () => void;
  onError: (error: TError) => void
}

export type TError = {code: string, message: string}
