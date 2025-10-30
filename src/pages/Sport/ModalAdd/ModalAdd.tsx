import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./ModalAdd.module.css";
import { Button, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TModalAddPage = "summary" | "exoType" | "muscles" | "exercice" | "weekSession";

const ModalAdd = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: (isAlertCloseModal: boolean) => void;
}) => {
  const [page, setPage] = useState<TModalAddPage>("summary");
  const handleCloseModal = () => closeModal(false);
  const alertCloseModal = () => closeModal(true)
  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <Box className={styles.btnCloseWrapper}>
          <IconButton onClick={alertCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack spacing={2}>
          <Button variant="outlined">Types d'exercice</Button>
          <Button variant="outlined">Groupes musculaire</Button>
          <Button variant="outlined">Exercices</Button>
          <Button variant="contained">Semaine d'entrainement</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
