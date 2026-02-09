import DialogAlert from "@components/DialogAlert/DialogAlert";
import NestedItem from "@components/NestedItem/NestedItem";
import { useAlertDispatch } from "@contexts/Alert/AlertContext";
import { repetitionTime } from "@enums";
import { Button, Divider, Paper, Stack, TextField, Box, Typography } from "@mui/material";
import SearchBloc from "@pages/Sport/ModalAdd/components/SearchBloc";
import AddExo from "@pages/Sport/ModalAdd/ModalPage/ModalBlocExo/AddExo";
import {
  useDeleteBlocExos,
  usePatchBlocExos,
  usePostBlocExos,
} from "@queries/sportQueries/blocsExos";
import { TBlocExos, TError, TExoInBloc } from "@queries/sportQueries/types";
import { updateTabValue } from "@utils/array/array";
import { formatTime } from "@utils/format/format";
import { useEffect, useMemo, useState } from "react";

const defaultBlocExoValue = {
  exercice: null,
  duration: 45,
  is_time_duration: true,
  recovery_time: 30,
};

const ModalBlocExos = ({
  setHasUnsaveWork,
}: {
  setHasUnsaveWork: (bool: boolean) => void;
}) => {
  const [isAlertDelete, setIsAlertDelete] = useState<boolean>(false);

  const [selectedBloc, setSelectedBloc] = useState<TBlocExos | null>(null);
  const [name, setName] = useState<string>("");
  const [exercices, setExercices] = useState<TExoInBloc[]>([]);
  const { addError, addSuccess } = useAlertDispatch();

  const estimatedTime = useMemo(() => {
    return exercices.reduce((acc, exo) => {
      const duration = exo.is_time_duration
        ? exo.duration + exo.recovery_time
        : exo.duration * repetitionTime + exo.recovery_time;
      return acc + duration;
    }, 0);
  }, [exercices]);

  const queryCallback = (suffixMsgSuccess: string) => ({
    onError(err: TError) {
      addError({ ...err, table: "blocExo" });
    },
    onSuccess() {
      addSuccess(`Le bloc ${name} à bien été ${suffixMsgSuccess}`);
      resetValue();
    },
  });

  const postBloc = usePostBlocExos(queryCallback("créé"));
  const patchBloc = usePatchBlocExos(queryCallback("modifié"));
  const deleteBloc = useDeleteBlocExos(queryCallback("supprimé"));

  const resetValue = () => {
    setSelectedBloc(null);
    setName("");
    setExercices([]);
  };

  const handleChangeSelectedBloc = (bloc: TBlocExos | null) => {
    setSelectedBloc(bloc);
    if (bloc) {
      setName(bloc.name);
      if (bloc.exercices) setExercices(bloc.exercices);
    } else resetValue();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleChangeExercices = (index: number, value: TExoInBloc) => {
    setExercices(updateTabValue(exercices, index, value) as TExoInBloc[]);
  };
  const handleAddExo = () => {
    setExercices([
      ...exercices,
      { ...defaultBlocExoValue, order: exercices.length + 1 },
    ] as TExoInBloc[]);
  };
  const handleDeleteExo = (idx: number) =>
    setExercices(updateTabValue(exercices, idx) as TExoInBloc[]);

  const handleSave = () => {
    if (selectedBloc?.id) {
      patchBloc.mutate({
        ...selectedBloc,
        name,
        exercices,
        estimated_time: estimatedTime,
      });
    } else {
      postBloc.mutate({
        name,
        exercices,
        estimated_time: estimatedTime,
      });
    }
  };

  const handleDelete = () => {
    if (selectedBloc?.id) {
      deleteBloc.mutate(selectedBloc.id);
      handleCloseAlertDelete();
    }
  };

  const handleCloseAlertDelete = () => setIsAlertDelete(false);
  const handleOpenAlertDelete = () => setIsAlertDelete(true);

  useEffect(() => {
    if (name !== "" || exercices.length > 0) setHasUnsaveWork(true);
    else setHasUnsaveWork(false);
  }, [setHasUnsaveWork, name, exercices]);

  return (
    <>
      <DialogAlert
        isOpen={isAlertDelete}
        cancel={handleCloseAlertDelete}
        confirm={handleDelete}
        title={`Êtes-vous sur de vouloir supprimer le bloc d'exercice: ${name}`}
        content={`La suppression d'un bloc peut avoir un impact sur les entrainements l'utilisant`}
      />

      <SearchBloc selectedBloc={selectedBloc} onChange={handleChangeSelectedBloc} />
      <Divider />

      <Stack mt={3}>
        <TextField
          label="Nom du bloc"
          required
          value={name}
          onChange={handleChangeName}
          sx={{ width: 350, margin: "auto", mb: 2 }}
        />
        <Typography margin="auto" mb={2}>
          Temps estimé: {formatTime(estimatedTime, "mm:ss")} minutes
        </Typography>
        {exercices.map((exo, idx) => {
          return (
            <NestedItem
              key={`bloc-exo-${idx}`}
              title={`Exercice n°${idx + 1} ${
                exo?.exercice?.name ? exo.exercice.name : ""
              }`}
              openDefault={exercices.length <= idx + 2}
              onDelete={() => handleDeleteExo(idx)}
            >
              <Paper sx={{ padding: "8px" }}>
                <AddExo
                  value={exo}
                  onChange={(newValue: TExoInBloc) =>
                    handleChangeExercices(idx, newValue)
                  }
                />
              </Paper>
            </NestedItem>
          );
        })}
      </Stack>
      <Button onClick={handleAddExo} sx={{ mt: 2, mb: 6, width: "100%" }}>
        Ajouter un exercices
      </Button>
      <Stack justifyContent="flex-end" flexDirection="row">
        {selectedBloc && (
          <>
            <Button variant="text" onClick={handleOpenAlertDelete} color="warning">
              Supprimer
            </Button>
            <Button onClick={resetValue}>Annuler</Button>
          </>
        )}
        <Button onClick={handleSave}>{selectedBloc ? "Modifier" : "Sauvegarder"}</Button>
      </Stack>
    </>
  );
};

export default ModalBlocExos;
