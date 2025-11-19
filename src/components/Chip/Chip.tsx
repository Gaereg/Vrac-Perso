import DialogAlert from "@components/DialogAlert/DialogAlert";
import { Chip as MuiChip } from "@mui/material";
import { useState } from "react";

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

export default Chip;
