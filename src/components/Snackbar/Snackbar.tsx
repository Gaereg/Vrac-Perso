import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { useAlert, useAlertDispatch } from "@contexts/Alert/AlertContext";

export const Snackbar = () => {
  const { isError, msgError, isSuccess, msgSuccess } = useAlert();
  const { closeAlert } = useAlertDispatch();

  return (
    <>
      <MuiSnackbar
        open={isError}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeAlert}
        slotProps={{ clickAwayListener: { mouseEvent: false } }}
      >
        <Alert severity="error" onClose={closeAlert}>
          {msgError}
        </Alert>
      </MuiSnackbar>
      <MuiSnackbar
        open={isSuccess}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeAlert}
        slotProps={{ clickAwayListener: { mouseEvent: false } }}
      >
        <Alert severity="success" onClose={closeAlert}>
          {msgSuccess}
        </Alert>
      </MuiSnackbar>
    </>
  );
};
