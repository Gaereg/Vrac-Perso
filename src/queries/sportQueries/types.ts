import { enumMuscleGrp } from "@enums";

export type TTypesExo = {
  id: number;
  created_at: Date;
  name: string;
};
export type TTypesExoPayload = { name: string };

export type TMuscles = {
  id: number;
  created_at: Date;
  name: string;
  muscle_group: enumMuscleGrp;
};
export type TMusclesPayload = { name: string, muscle_group: enumMuscleGrp };


export type TId = { id: number };
