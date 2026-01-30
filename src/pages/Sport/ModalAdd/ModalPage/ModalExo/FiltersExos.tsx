import { enumMuscleGrp, muscleGrpTxt } from "@enums";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetFilteredExos } from "@queries/sportQueries/exo";
import { TExo } from "@queries/sportQueries/types";
import { useGetTypesExo } from "@queries/sportQueries/typesExo";
import { SyntheticEvent, useState } from "react";

const FiltersExos = ({
  onChangeExo,
  selectedExo,
}: {
  onChangeExo: (exo: TExo | null) => void;
  selectedExo: TExo | null;
}) => {
  const [typeExo, setTypeExo] = useState<number | "">("");
  const [muscleGrp, setMusclesGrp] = useState<enumMuscleGrp | "">("");

  const { data: typesExo } = useGetTypesExo();
  const { data: exercices } = useGetFilteredExos({
    ...(typeof typeExo === "number" && { typeExo }),
    ...(muscleGrp !== "" && { muscleGrp }),
  });

  const handleChangeTypeExo = (e: SelectChangeEvent<number | null>) =>
    setTypeExo(e.target.value as number);

  const handleChangeMuscleGrp = (e: SelectChangeEvent<enumMuscleGrp | null>) =>
    setMusclesGrp(e.target.value as enumMuscleGrp);

  const handleChangeAutocomplete = (
    _e: SyntheticEvent<Element, Event>,
    value: TExo | null
  ) => {
    console.log(value)
    onChangeExo(value);
  };

  return (
    <>
      <Typography color="primary">Chercher un exercice</Typography>
      <Stack direction="row" my={2} spacing={2}>
        <FormControl sx={{ width: 200 }} variant="filled" size="small">
          <InputLabel id="type-exo">Types d'exercice</InputLabel>
          <Select labelId="type-exo" value={typeExo} onChange={handleChangeTypeExo}>
            {typesExo &&
              typesExo.map((type) => (
                <MenuItem key={"type-exo" + type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }} variant="filled" size="small">
          <InputLabel id="muscle-grp">Groupe Musculaire</InputLabel>
          <Select labelId="muscle-grp" value={muscleGrp} onChange={handleChangeMuscleGrp}>
            {Object.values(enumMuscleGrp).map((option) => (
              <MenuItem key={option} value={option}>
                {muscleGrpTxt[option]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          value={selectedExo}
          inputValue={selectedExo?.name || ''}
          id="manageable-states-demo"
          options={exercices || []}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeAutocomplete}
          sx={{ width: 280 }}
          renderInput={(params) => (
            <TextField {...params} label="Exercices" variant="filled" size="small" />
          )}
        />
      </Stack>
    </>
  );
};

export default FiltersExos;
