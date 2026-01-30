export type TProgDay = {
  name: string;
  blocsExo: TBlocExos[];
};

export type TBlocExos = {
  name: string;
  duration: number;
  pause: number;
  exercices: {
    exoId: number;
    pause: number;
  }[];
};
