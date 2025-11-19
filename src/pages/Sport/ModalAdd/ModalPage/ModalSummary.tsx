import { Button, Stack } from "@mui/material";
import { TModalAddPage } from "@pages/Sport/ModalAdd/ModalAddTypes";

const ModalSummary = ({setPage}: {setPage: (page:TModalAddPage) => void}) => {
  return (
    <Stack spacing={2}>
      <Button variant="outlined" onClick={() => {setPage("typesExo")}}>Types d'exercice</Button>
      <Button variant="outlined" onClick={() => setPage("muscles")}>Muscles</Button>
      <Button variant="outlined" onClick={() => setPage("exercices")}>Exercices</Button>
      <Button variant="contained" onClick={() => setPage("weekSessions")}>Semaine d'entrainement</Button>
    </Stack>
  );
};

export default ModalSummary;
