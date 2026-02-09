import {
  Stack,
  MenuItem,
  InputLabel,
  Select,
  OutlinedInput,
  FormControl,
  SelectChangeEvent,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useGetMuscles } from "@queries/sportQueries/muscles";
import { useState, useEffect, FormEvent } from "react";
import { useGetTypesExo } from "@queries/sportQueries/typesExo";
import { useDeleteExo, usePatchExo, usePostExo } from "@queries/sportQueries/exo";
import { enumMuscleGrp } from "@enums";
import { useAlertDispatch } from "@contexts/Alert/AlertContext";
import SelectMuscles from "@pages/Sport/ModalAdd/ModalPage/ModalExo/SelectMuscles";
import SearchExercice from "@pages/Sport/ModalAdd/components/SearchExercice";
import { TError, TExo } from "@queries/sportQueries/types";
import DialogAlert from "@components/DialogAlert/DialogAlert";

type TNewExo = {
  id?: number;
  name: string;
  description: string;
  type_exercice_id: number | "";
  main_muscles_id: number[];
  secondary_muscles_id: number[];
  main_muscles?: string[];
  secondary_muscles?: string[];
};

const newExoDefaultValue = {
  name: "",
  description: "",
  type_exercice_id: "",
  main_muscles_id: [],
  secondary_muscles_id: [],
} as TNewExo;

const ModalExo = ({
  setHasUnsaveWork,
}: {
  setHasUnsaveWork: (bool: boolean) => void;
}) => {
  const { data: muscles } = useGetMuscles();
  const { data: typesExo } = useGetTypesExo();
  const [newExo, setNewExo] = useState<TNewExo>(newExoDefaultValue);
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);

  const { addError, closeAlert, addSuccess } = useAlertDispatch();

  const queryCallback = (suffixMsgSuccess: string) => ({
    onSuccess: () => {
      closeAlert();
      addSuccess(`L'exercice ${newExo.name} a bien été ${suffixMsgSuccess}`);
      resetValue();
    },
    onError: (err:TError) => addError({ ...err, table: "exercices" }),
  })
  const postExo = usePostExo(queryCallback('créé'));
  const patchExo = usePatchExo(queryCallback("modifié"));
  const deleteExo = useDeleteExo(queryCallback("supprimé"));

  const changeNewExo = <T,>(key: keyof TNewExo, value: T) =>
    setNewExo({ ...newExo, [key]: value });

  const handleChangeMainMuscles = (e: SelectChangeEvent<number[]>) =>
    changeNewExo<number[]>("main_muscles_id", e.target.value as number[]);

  const handleChangeSecondaryMuscles = (e: SelectChangeEvent<number[]>) =>
    changeNewExo("secondary_muscles_id", e.target.value as number[]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeNewExo("name", e.target.value);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeNewExo("description", e.target.value);

  const handleChangeTypeExo = (e: SelectChangeEvent<number | null>) =>
    changeNewExo("type_exercice_id", e.target.value as number);

  const resetValue = () => setNewExo(newExoDefaultValue);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!muscles) return;
    const payload = {
      ...newExo,
      type_exercice_id: newExo.type_exercice_id as number,
      grp_muscles: Array.from(
        new Set(
          newExo.main_muscles_id.map(
            (id) =>
              muscles.find((muscle) => muscle.id === id)?.muscle_group as enumMuscleGrp
          )
        )
      ),
    };

    if (newExo.id) {
      const { main_muscles, secondary_muscles, ...cleanPayload } = payload;
      patchExo.mutate({ ...cleanPayload, id: newExo.id });
    } else {
      postExo.mutate(payload);
    }
  };

  const handleSelectExo = (exo: TExo | null) => {
    if (exo) {
      setNewExo(exo);
    } else {
      resetValue();
    }
  };

  const handleOpenAlertDelete = () => setIsAlertDelete(true);
  const handleCloseAlertDelete = () => setIsAlertDelete(false);
  const handleDeleteExo = () => {
    if (newExo.id) deleteExo.mutate(newExo.id);
    handleCloseAlertDelete();
  };
  const handleCancelModification = () => handleSelectExo(null);

  useEffect(() => {
    if (newExo.name) setHasUnsaveWork(true);
    else setHasUnsaveWork(false);

    return () => setHasUnsaveWork(false);
  }, [newExo, setHasUnsaveWork]);

  return (
    <>
      <DialogAlert
        isOpen={isAlertDelete}
        cancel={handleCloseAlertDelete}
        confirm={handleDeleteExo}
        title={`Êtes-vous sur de vouloir supprimer l'exercice: ${newExo.name}`}
        content={`La suppression d'un exercice peut avoir un impact si des entrainements l'utilisais`}
      />
      <SearchExercice
        title="Chercher un exercice"
        onChangeExo={handleSelectExo}
        selectedExo={newExo.id ? (newExo as TExo) : null}
      />
      <Divider />
      {typesExo && muscles ? (
        <form onSubmit={handleSave}>
          <Stack my={3} spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label="Nom de l'exercice"
                value={newExo.name}
                onChange={handleChangeName}
                sx={{ width: "350px", flex: 1 }}
              />

              <FormControl sx={{ width: 350, flex: 1 }} required>
                <InputLabel id="type-exo">Types d'exercice</InputLabel>
                <Select
                  labelId="type-exo"
                  value={newExo.type_exercice_id}
                  input={<OutlinedInput label="Types d'exercice" />}
                  onChange={handleChangeTypeExo}
                >
                  {typesExo.map((type) => (
                    <MenuItem key={"type-exo" + type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <SelectMuscles
                choices={muscles}
                isMain
                value={newExo.main_muscles_id}
                onChange={handleChangeMainMuscles}
              />
              <SelectMuscles
                choices={muscles?.filter(
                  (muscle) => !newExo.main_muscles_id.find((id) => id === muscle.id)
                )}
                value={newExo.secondary_muscles_id}
                onChange={handleChangeSecondaryMuscles}
              />
            </Stack>

            <TextField
              label="Description"
              value={newExo.description}
              onChange={handleChangeDescription}
              multiline
              minRows={6}
              maxRows={6}
            />
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {newExo.id && (
              <>
                <Button variant="text" onClick={handleOpenAlertDelete} color="warning">
                  Supprimer
                </Button>
                <Button onClick={handleCancelModification}>Annuler</Button>
              </>
            )}
            <Button variant="outlined" type="submit" color="primary">
              {newExo.id ? "Modifier" : "Sauvegarder"}
            </Button>
          </Stack>
        </form>
      ) : (
        <Stack alignItems="center" m={4}>
          <CircularProgress />
        </Stack>
      )}
    </>
  );
};

export default ModalExo;
