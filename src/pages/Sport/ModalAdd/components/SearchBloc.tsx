import { Box, Autocomplete, TextField, Typography, Stack } from "@mui/material";
import { useGetBlocExos } from "@queries/sportQueries/blocsExos";
import { TBlocExos } from "@queries/sportQueries/types";
import { SyntheticEvent } from "react";

const SearchBloc = ({
  selectedBloc,
  onChange,
}: {
  selectedBloc: TBlocExos | null;
  onChange: (bloc: TBlocExos | null) => void;
}) => {
  const { data: blocs } = useGetBlocExos();

  const handleChangeAutocomplete = (
    _e: SyntheticEvent<Element, Event>,
    value: TBlocExos | null
  ) => {
    onChange(value);
  };
  return (
    <Box>
      <Typography color="primary">cherchez un bloc d'exercices</Typography>
      <Stack direction="row" my={2} spacing={2}>
        <Autocomplete
          value={selectedBloc}
          inputValue={selectedBloc?.name || ""}
          options={blocs || []}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeAutocomplete}
          sx={{ width: 280 }}
          renderInput={(params) => (
            <TextField {...params} label="Bloc existant" variant="filled" size="small" />
          )}
        />
      </Stack>
    </Box>
  );
};

export default SearchBloc;
