import NumberSpinner from "@components/NumberField/NumberSpinner";
import { Box, Slider, Stack, Switch, Typography } from "@mui/material";
import SearchExercice from "@pages/Sport/ModalAdd/components/SearchExercice";
import { TExoInBloc, TExo } from "@queries/sportQueries/types";
import { formatTime } from "@utils/format/format";

const AddExo = ({
  value,
  onChange,
}: {
  value: TExoInBloc;
  onChange: (newValue: TExoInBloc) => void;
}) => {
  const handleChange = <T,>(key: keyof TExoInBloc, newValue:T) => onChange({...value, [key]: newValue})

  const handleChangeExo = (exo: TExo | null) => exo && handleChange<TExo>('exercice', exo);
  const handleChangeTypeDuration = () => handleChange('is_time_duration', !value.is_time_duration)
  const handleChangeRecoveryTime = (_e: Event, value: number) => handleChange<number>('recovery_time', value)
  const handleChangeDuration = (value: number | null) => value && handleChange<number>('duration', value)

  return (
    <Stack spacing={4} alignItems="center">
      <SearchExercice onChangeExo={handleChangeExo} selectedExo={value.exercice} />
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography>Durée de l'exercice :</Typography>
        <NumberSpinner
          size="small"
          step={value.is_time_duration ? 5 : 1}
          min={0}
          value={value.duration}
          onValueChange={handleChangeDuration}
        />
        <Stack direction="row" alignItems="center">
          <Typography>Répétition</Typography>
          <Switch checked={value.is_time_duration} onChange={handleChangeTypeDuration} />
          <Typography>Temps (en seconde)</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography width={170}>Temps de repo :</Typography>
        <Box width={300}>
          <Slider
            min={0}
            max={300}
            step={15}
            marks
            value={value.recovery_time}
            onChange={handleChangeRecoveryTime}
          />
        </Box>
        <Typography>{formatTime(value.recovery_time, "mm:ss")} min</Typography>
      </Stack>
    </Stack>
  );
};

export default AddExo;
