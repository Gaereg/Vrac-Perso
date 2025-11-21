import Chip, { ChipWrapper } from "@components/Chip/Chip";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { TTypesExo } from "@queries/sportQueries/types";
import {
  usePatchTypesExo,
  usePostTypesExo,
  useDeleteTypesExo,
  useGetTypesExo,
} from "@queries/sportQueries/typesExo";
import { useEffect, useState } from "react";

type TProps = {
  setHasUnsaveWork: (bool: boolean) => void;
};

const ModalTypesExo = ({ setHasUnsaveWork }: TProps) => {
  const [newName, setNewName] = useState<string>("");
  const [idToModify, setIdToModify] = useState<number | null>(null);
  const typesExo = useGetTypesExo();

  const successCallback = () => {
    setNewName("");
    setIdToModify(null);
  };
  
  const postTypesMutation = usePostTypesExo(successCallback);
  const patchTypesMutation = usePatchTypesExo(successCallback);
  const deleteTypesMutation = useDeleteTypesExo();

  const handleChangeTypeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleClickCancel = () => {
    setIdToModify(null);
    setNewName("");
  };

  const handleClickChip = (type: TTypesExo) => {
    if (type.id === idToModify) {
      handleClickCancel();
    } else {
      setIdToModify(type.id);
      setNewName(type.name);
    }
  };

  const handleClickSave = () => newName && postTypesMutation.mutate({ name: newName });

  const handleClickUpdate = () => {
    if (idToModify && newName) {
      patchTypesMutation.mutate({ name: newName, id: idToModify });
    }
  };

  const handleClickDelete = (id: number) => deleteTypesMutation.mutate({ id });

  useEffect(() => {
    if (newName) setHasUnsaveWork(true);
    else setHasUnsaveWork(false);

    return () => setHasUnsaveWork(false);
  }, [newName, setHasUnsaveWork]);

  return (
    <Box>
      {typesExo.isPending || !typesExo.data ? (
        <Stack direction="row" justifyContent="center" marginBottom={3}>
          <CircularProgress size={30} />
        </Stack>
      ) : (
        <ChipWrapper>
          <>
            {typesExo.data.map((type) => (
              <Chip
                label={type.name}
                key={type.id}
                onClick={() => handleClickChip(type)}
                isSelected={type.id === idToModify}
                onDelete={() => handleClickDelete(type.id)}
              />
            ))}
          </>
        </ChipWrapper>
      )}
      <Stack spacing={3}>
        <TextField
          label="Type d'exercices"
          value={newName}
          onChange={handleChangeTypeName}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {idToModify ? (
            <>
              <Button onClick={handleClickCancel}>Annuler</Button>
              <Button variant="outlined" onClick={handleClickUpdate} disabled={!newName}>
                Modifier
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={handleClickSave} disabled={!newName}>
              Sauvegarder
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ModalTypesExo;
