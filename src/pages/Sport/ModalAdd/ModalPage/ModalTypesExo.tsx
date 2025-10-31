import { Button, Stack, TextField } from "@mui/material";
import React from "react";

const ModalTypesExo = () => {
  return (
    <form>
      <Stack spacing={3}>
        <TextField label="Type d'exercices" />
        <Button type="submit">Sauvegarder</Button>
      </Stack>
    </form>
  );
};

export default ModalTypesExo;
