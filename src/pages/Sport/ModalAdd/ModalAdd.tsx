import { useState } from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import styles from "./ModalAdd.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TModalAddPage } from "@pages/Sport/ModalAdd/ModalAddTypes";
import ModalSummary from "@pages/Sport/ModalAdd/ModalPage/ModalSummary";
import ModalTypesExo from "@pages/Sport/ModalAdd/ModalPage/ModalTypesExo";

const ModalAdd = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: (isAlertCloseModal: boolean) => void;
}) => {
  const [page, setPage] = useState<TModalAddPage>("summary");
  const handleCloseModal = () => closeModal(false);
  const alertCloseModal = () => closeModal(true);

  const handleGoSummary = () => setPage("summary");

  const modalContent = () => {
    switch (page) {
      case "typesExo":
        return <ModalTypesExo />;
      default:
        return <ModalSummary setPage={setPage} />;
    }
  };

  const modalTitle = () => {
    switch (page) {
      case "typesExo":
        return "Types d'exercices";
      default:
        return "";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <Box className={styles.modalHeader}>
          {page !== "summary" && (
            <IconButton onClick={handleGoSummary} className={styles.btnGoSummary}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">{modalTitle()}</Typography>
          <IconButton onClick={alertCloseModal} className={styles.btnClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>{modalContent()}</Box>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
