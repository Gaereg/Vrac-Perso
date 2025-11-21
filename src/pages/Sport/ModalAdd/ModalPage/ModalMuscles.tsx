import Chip, { ChipWrapper } from "@components/Chip/Chip";
import { Box, Button, CircularProgress, MenuItem, Stack, TextField } from "@mui/material";
import { TMuscles } from "@queries/sportQueries/types";
import {
  usePatchMuscles,
  usePostMuscles,
  useDeleteMuscles,
  useGetMuscles,
} from "@queries/sportQueries/muscles";
import { useEffect, useState } from "react";
import { enumMuscleGrp, muscleGrpTxt } from "@enums";

type TProps = {
  setHasUnsaveWork: (bool: boolean) => void;
};

const ModalMuscles = ({ setHasUnsaveWork }: TProps) => {
  const [newName, setNewName] = useState<string>("");
  const [muscleGrp, setMusclesGrp] = useState<enumMuscleGrp>(enumMuscleGrp.LEGS);
  const [idToModify, setIdToModify] = useState<number | null>(null);
  const { data, isPending } = useGetMuscles();

    const successCallback = () => {
    setNewName("");
    setIdToModify(null);
  };

  const postMusclesMutation = usePostMuscles(successCallback);
  const patchMusclesMutation = usePatchMuscles(successCallback);
  const deleteMusclesMutation = useDeleteMuscles();

  const handleChangeTypeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);

  const handleChangeMuscleGrp = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMusclesGrp(e.target.value as enumMuscleGrp);

  const handleClickCancel = () => {
    setIdToModify(null);
    setNewName("");
  };

  const handleClickChip = (type: TMuscles) => {
    if (type.id === idToModify) {
      handleClickCancel();
    } else {
      setIdToModify(type.id);
      setNewName(type.name);
      setMusclesGrp(type.muscle_group);
    }
  };

  const handleClickSave = () => {
    if (newName && muscleGrp) {
      postMusclesMutation.mutate({ name: newName, muscle_group: muscleGrp });
    }
  };

  const handleClickUpdate = () => {
    if (idToModify && newName && muscleGrp) {
      patchMusclesMutation.mutate({
        name: newName,
        muscle_group: muscleGrp,
        id: idToModify,
      });
    }
  };

  const handleClickDelete = (id: number) => deleteMusclesMutation.mutate({ id });

  useEffect(() => {
    if (newName) setHasUnsaveWork(true);
    else setHasUnsaveWork(false);

    return () => setHasUnsaveWork(false);
  }, [newName, setHasUnsaveWork]);

  return (
    <Box>
      {isPending || !data ? (
        <Stack direction="row" justifyContent="center" marginBottom={3}>
          <CircularProgress size={30} />
        </Stack>
      ) : (
        <ChipWrapper>
          <>
            {data.map((type) => (
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
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{width: '200px'}}
            select
            label="Groupe musculaire"
            value={muscleGrp}
            onChange={handleChangeMuscleGrp}
          >
            {Object.values(enumMuscleGrp).map((option) => (
              <MenuItem key={option} value={option}>
                {muscleGrpTxt[option]}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Muscle" value={newName} onChange={handleChangeTypeName} />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {idToModify ? (
            <>
              <Button onClick={handleClickCancel}>Annuler</Button>
              <Button variant="outlined" onClick={handleClickUpdate} disabled={!newName}>
                Modifier
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={handleClickSave} disabled={!newName || !muscleGrp}>
              Sauvegarder
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ModalMuscles;
