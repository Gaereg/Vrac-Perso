import NestedItem from "@components/NestedItem/NestedItem";
import { Button, Stack } from "@mui/material";
import BlocExos from "@pages/Sport/ModalAdd/ModalPage/ModalWeekProg/BlocExos";
import { TProgDay } from "@pages/Sport/ModalAdd/ModalPage/ModalWeekProg/types";

const ProgDay = ({ day, idx }: { day: TProgDay; idx: number }) => {
  return (
    <NestedItem name={day.name} openDefault={idx === 0 ? true : false}>
      <Stack mx={3}>
        {day.blocsExo && day.blocsExo.map((bloc) => <BlocExos data={bloc} />)}
        <Button>Ajouter un bloc d'exercices</Button>
      </Stack>
    </NestedItem>
  );
};

export default ProgDay;
