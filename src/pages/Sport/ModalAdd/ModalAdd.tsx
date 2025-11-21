import { useState } from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import styles from "./ModalAdd.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TModalAddPage } from "@pages/Sport/ModalAdd/ModalAddTypes";
import ModalSummary from "@pages/Sport/ModalAdd/ModalPage/ModalSummary";
import DialogAlert from "@components/DialogAlert/DialogAlert";
import ModalTypesExo from "@pages/Sport/ModalAdd/ModalPage/ModalTypesExo";
import ModalMuscles from "@pages/Sport/ModalAdd/ModalPage/ModalMuscles";

const ModalAdd = ({
  isOpen,
  closeModalAdd,
}: {
  isOpen: boolean;
  closeModalAdd: () => void;
}) => {
  const [page, setPage] = useState<TModalAddPage>("summary");
  const [isAlertCloseOpen, setIsAlertCloseOpen] = useState(false);
  const [hasUnsaveWork, setHasUnsaveWork] = useState(false);

  const handleGoSummary = () => setPage("summary");

  const modalContent = () => {
    switch (page) {
      case "typesExo":
        return <ModalTypesExo setHasUnsaveWork={setHasUnsaveWork} />;
      case "muscles":
        return <ModalMuscles setHasUnsaveWork={setHasUnsaveWork} />;
      default:
        return <ModalSummary setPage={setPage} />;
    }
  };

  const modalTitle = () => {
    switch (page) {
      case "typesExo":
        return "Types d'exercices";
      case "muscles":
        return "Muscles";
      default:
        return "";
    }
  };
  const closeModal = () => {
    setPage("summary");
    closeModalAdd();
  };

  const handleCloseModal = () =>
    hasUnsaveWork ? setIsAlertCloseOpen(true) : closeModal();

  const handleCancelAlert = () => setIsAlertCloseOpen(false);
  const handleConfirmAlert = () => {
    setHasUnsaveWork(false);
    setIsAlertCloseOpen(false);
    closeModal();
  };

  return (
    <>
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
            <IconButton onClick={handleCloseModal} className={styles.btnClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>{modalContent()}</Box>
        </Box>
      </Modal>

      <DialogAlert
        isOpen={isAlertCloseOpen}
        confirm={handleConfirmAlert}
        cancel={handleCancelAlert}
        title="Voulez-vous vraiment fermer la modal ?"
        content="Tous travail non sauvegardé sera perdu"
      />
    </>
  );
};

export default ModalAdd;
