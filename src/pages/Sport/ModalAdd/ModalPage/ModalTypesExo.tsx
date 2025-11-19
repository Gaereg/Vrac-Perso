import Chip from "@components/Chip/Chip";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import {
  usePatchTypesExo,
  usePostTypesExo,
  useDeleteTypesExo,
} from "@queries/sportQueries/typesExo.ts";
import { TTypesExo } from "@queries/sportQueries/typesExo.types.ts";
import { useEffect, useState } from "react";

type TProps = {
  isPending: boolean;
  typesExo?: TTypesExo[];
  setHasUnsaveWork: (bool: boolean) => void;
};

const ModalTypesExo = ({ isPending, typesExo, setHasUnsaveWork }: TProps) => {
  const [newTypeName, setNewTypesName] = useState<string>("");
  const [idToModify, setIdToModify] = useState<number | null>(null);
  const postMutation = usePostTypesExo();
  const patchMutation = usePatchTypesExo();
  const deleteMutation = useDeleteTypesExo();

  const handleChangeTypeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTypesName(e.target.value);
  };

  const handleClickCancel = () => {
    setIdToModify(null);
    setNewTypesName("");
  };

  const handleClickChip = (type: TTypesExo) => {
    if (type.id === idToModify) {
      handleClickCancel();
    } else {
      setIdToModify(type.id);
      setNewTypesName(type.name);
    }
  };

  const handleClickSave = () => postMutation.mutate({ name: newTypeName });

  const handleClickUpdate = () =>
    idToModify && patchMutation.mutate({ name: newTypeName, id: idToModify });

  const handleClickDelete = (id: number) => deleteMutation.mutate({ id });

  useEffect(() => {
    if (newTypeName) setHasUnsaveWork(true);
    else setHasUnsaveWork(false);

    return () => setHasUnsaveWork(false)
  }, [newTypeName, setHasUnsaveWork]);

  return (
    <Box>
      {isPending || !typesExo ? (
        <Stack direction="row" justifyContent="center" marginBottom={3}>
          <CircularProgress size={30} />
        </Stack>
      ) : (
        <Stack
          spacing={2}
          useFlexGap
          direction="row"
          marginBottom={3}
          justifyContent="center"
          padding="0 10px"
          flexWrap="wrap"
          maxHeight={90}
          overflow="auto"
        >
          {typesExo.map((type) => (
            <Chip
              label={type.name}
              key={type.id}
              onClick={() => handleClickChip(type)}
              isSelected={type.id === idToModify}
              onDelete={() => handleClickDelete(type.id)}
            />
          ))}
        </Stack>
      )}
      <Stack spacing={3}>
        <TextField
          label="Type d'exercices"
          value={newTypeName}
          onChange={handleChangeTypeName}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {idToModify ? (
            <>
              <Button onClick={handleClickCancel}>Annuler</Button>
              <Button
                variant="outlined"
                onClick={handleClickUpdate}
                disabled={!newTypeName}
              >
                Modifier
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={handleClickSave} disabled={!newTypeName}>
              Sauvegarder
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ModalTypesExo;
