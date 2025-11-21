import DialogAlert from "@components/DialogAlert/DialogAlert";
import { Chip as MuiChip, Stack } from "@mui/material";
import { useState, ReactElement } from "react";

type TProps = {
  label: string;
  onClick: () => void;
  onDelete?: () => void;
  isSelected: boolean;
};

const Chip = ({ label, onClick, onDelete, isSelected }: TProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => setIsAlertOpen(true);
  const handleCancelAlert = () => setIsAlertOpen(false);
  const handleConfirmDelete = () => {
    setIsAlertOpen(false);
    if (onDelete) onDelete();
  };

  return (
    <>
      <MuiChip
        label={label}
        onClick={onClick}
        variant={isSelected ? "filled" : "outlined"}
        onDelete={onDelete && handleDelete}
      />

      {onDelete && (
        <DialogAlert
          isOpen={isAlertOpen}
          confirm={handleConfirmDelete}
          cancel={handleCancelAlert}
          title={`Voulez-vous vraiment supprimer ${label} ?`}
          content="La suppression peut entrainer des effets de bords sur les éléments utilisant ce paramètre"
        />
      )}
    </>
  );
};

export const ChipWrapper = ({ children }: { children: ReactElement }) => {
  return (
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
      {children}
    </Stack>
  );
};

export default Chip;
