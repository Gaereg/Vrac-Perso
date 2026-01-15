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
} from "@mui/material";
import { useGetMuscles } from "@queries/sportQueries/muscles";
import { useState, useEffect, FormEvent } from "react";
import { useGetTypesExo } from "@queries/sportQueries/typesExo";
import { useGetExos, usePostExo } from "@queries/sportQueries/exo";
import { enumMuscleGrp } from "@enums";

const ModalExo = ({
  setHasUnsaveWork,
}: {
  setHasUnsaveWork: (bool: boolean) => void;
}) => {
  const { data: muscles } = useGetMuscles();
  const { data: typesExo } = useGetTypesExo();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeExo, setTypeExo] = useState<number | "">("");
  const [mainMuscle, setMainMuscle] = useState<number[]>([]);
  const [secondaryMuscle, setSecondaryMuscle] = useState<number[]>([]);

  const { data: exos } = useGetExos();
  const postExo = usePostExo();

  const handleChangeMainMuscles = (e: SelectChangeEvent<number[]>) => 
    setMainMuscle(e.target.value as number[]);

  const handleChangeSecondaryMuscles = (e: SelectChangeEvent<number[]>) =>
    setSecondaryMuscle(e.target.value as number[]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const handleChangeTypeExo = (e: SelectChangeEvent<number | null>) =>
    setTypeExo(e.target.value as number);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (muscles) {
      postExo.mutate({
        name,
        description,
        type_exercice: typeExo,
        main_muscles: mainMuscle,
        secondary_muscles: secondaryMuscle,
        grp_muscles: Array.from(
          new Set(
            mainMuscle.map(
              (id) =>
                muscles.find((muscle) => muscle.id === id)?.muscle_group as enumMuscleGrp
            )
          )
        ),
      });
    }
  };

  useEffect(() => {
    if (name) setHasUnsaveWork(true);
    else setHasUnsaveWork(false);

    return () => setHasUnsaveWork(false);
  }, [name, setHasUnsaveWork]);

  const selectMuscle = (isMain: boolean) => {
    const choices = isMain
      ? muscles
      : muscles?.filter((muscle) => !mainMuscle.find((id) => id === muscle.id));

    return (
      muscles && (
        <FormControl sx={{ width: 350 }} required>
          <InputLabel id={`${isMain ? "main" : "sub"}-muscle`}>
            Mucles {isMain ? "Principaux" : "Secondaire"}
          </InputLabel>
          <Select
            labelId={`${isMain ? "main" : "sub"}-muscle`}
            multiple
            value={isMain ? mainMuscle : secondaryMuscle}
            input={
              <OutlinedInput label={`Mucles ${isMain ? "Principaux" : "Secondaire"}`} />
            }
            onChange={isMain ? handleChangeMainMuscles : handleChangeSecondaryMuscles}
          >
            {choices?.map((muscle) => (
              <MenuItem
                key={`${isMain ? "main" : "sub"}- ${muscle.id}`}
                value={muscle.id}
              >
                {muscle.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    );
  };

  return (
    <>
      {typesExo && muscles ? (
        <form onSubmit={handleSave}>
          <Stack m={1} my={3} spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label="Nom de l'exercice"
                value={name}
                onChange={handleChangeName}
                sx={{ width: "350px" }}
              />

              <FormControl sx={{ width: 350 }} required>
                <InputLabel id="type-exo">Types d'exercice</InputLabel>
                <Select
                  labelId="type-exo"
                  value={typeExo}
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
              {selectMuscle(true)}
              {selectMuscle(false)}
            </Stack>

            <TextField
              label="Description"
              value={description}
              onChange={handleChangeDescription}
              multiline
              minRows={6}
              maxRows={6}
            />
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" type="submit">
              Sauvegarder
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
