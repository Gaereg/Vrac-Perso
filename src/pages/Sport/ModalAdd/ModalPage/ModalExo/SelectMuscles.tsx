import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TMuscles } from "@queries/sportQueries/types";

type TProps = {
  choices: TMuscles[];
  value: number[];
  onChange: (e: SelectChangeEvent<number[]>) => void;
  isMain?: boolean;
};

const SelectMuscles = ({ choices, value, onChange, isMain = false }: TProps) => {
  return (
    <FormControl sx={{ width: 350 }} required>
      <InputLabel id={`${isMain ? "main" : "sub"}-muscle`}>
        Mucles {isMain ? "Principaux" : "Secondaire"}
      </InputLabel>
      <Select
        labelId={`${isMain ? "main" : "sub"}-muscle`}
        multiple
        value={value}
        input={<OutlinedInput label={`Mucles ${isMain ? "Principaux" : "Secondaire"}`} />}
        onChange={onChange}
      >
        {choices?.map((muscle) => (
          <MenuItem key={`${isMain ? "main" : "sub"}- ${muscle.id}`} value={muscle.id}>
            {muscle.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMuscles;
