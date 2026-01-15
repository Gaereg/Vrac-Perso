import { useState, useMemo } from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import styles from "./ModalAdd.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TModalAddPage } from "@pages/Sport/ModalAdd/ModalAddTypes";
import ModalSummary from "@pages/Sport/ModalAdd/ModalPage/ModalSummary";
import DialogAlert from "@components/DialogAlert/DialogAlert";
import ModalTypesExo from "@pages/Sport/ModalAdd/ModalPage/ModalTypesExo";
import ModalMuscles from "@pages/Sport/ModalAdd/ModalPage/ModalMuscles";
import ModalExo from "@pages/Sport/ModalAdd/ModalPage/ModalExo";

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
      case "exercices":
        return <ModalExo setHasUnsaveWork={setHasUnsaveWork} />;
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
      case "exercices":
        return "Exercices";
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

  const modalWidth = useMemo(() => {
    switch (page) {
      case "summary":
        return "400px";
      case "muscles":
      case "typesExo":
        return "600px";
      case "exercices":
        return "800px";
      default:
        return "400px";
    }
  }, [page]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal} maxWidth={modalWidth} minWidth="400px">
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
