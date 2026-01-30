import { Stack } from "@mui/material";
import BlocExos from "@pages/Sport/ModalAdd/ModalPage/ModalWeekProg/BlocExos";
import ProgDay from "@pages/Sport/ModalAdd/ModalPage/ModalWeekProg/ProgDay";
import { TProgDay } from "@pages/Sport/ModalAdd/ModalPage/ModalWeekProg/types";
import { useState } from "react";

const ModalWeekProg = () => {
  const [week, setWeek] = useState<TProgDay[]>([
    { name: "Jour 1" },
    { name: "Jour 2" },
    { name: "Jour 3" },
    { name: "Jour 4" },
    { name: "Jour 5" },
    { name: "Jour 6" },
    { name: "Jour 7" },
  ]);

  const updateDay = (day: number, newValue: TProgDay) =>
    setWeek([...week.slice(0, day), newValue, ...week.slice(day)]);

  const addBlocExos = (day: number, name: string) =>
    updateDay(day, {
      ...week[day],
      blocsExo: [...week[day].blocsExo, { name, duration: 0, exercices: [] }],
    });

  return (
    <Stack>
      {week.map((day, idx) => (
        <ProgDay day={day} idx={idx} addBlocExos={addBlocExos} />
      ))}
    </Stack>
  );
};

export default ModalWeekProg;
