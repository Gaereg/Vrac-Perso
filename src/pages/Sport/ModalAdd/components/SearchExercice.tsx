import { enumMuscleGrp, muscleGrpTxt } from "@enums";
import {
  Autocomplete,
  Box,
  Divider,
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

const SearchExercice = ({
  onChangeExo,
  selectedExo,
  title,
}: {
  onChangeExo: (exo: TExo | null) => void;
  selectedExo: TExo | null;
  title?: string;
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
    onChangeExo(value);
  };

  return (
    <Box width="100%">
      {title && <Typography color="primary">{title}</Typography>}
      <Stack direction="row" my={2} spacing={2}>
        <FormControl sx={{ flex: 2 }} variant="filled" size="small">
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
        <FormControl sx={{ flex: 2 }} variant="filled" size="small">
          <InputLabel id="muscle-grp">Groupe Musculaire</InputLabel>
          <Select labelId="muscle-grp" value={muscleGrp} onChange={handleChangeMuscleGrp}>
            {Object.values(enumMuscleGrp).map((option) => (
              <MenuItem key={option} value={option}>
                {muscleGrpTxt[option]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Autocomplete
          value={selectedExo}
          inputValue={selectedExo?.name || ""}
          options={exercices || []}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeAutocomplete}
          sx={{ flex: 3 }}
          renderInput={(params) => (
            <TextField {...params} label="Exercices" variant="filled" size="small" />
          )}
        />
      </Stack>
    </Box>
  );
};

export default SearchExercice;
