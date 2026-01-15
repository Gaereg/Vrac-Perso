import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useAlert, useAlertDispatch } from "@contexts/Alert/AlertContext";
export const Alert = () => {
  const { isError, msgError, isSuccess, msgSuccess } = useAlert();
  const { closeAlert } = useAlertDispatch();

  return (
    <Snackbar
      open={isError}
      autoHideDuration={15000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={closeAlert}
      slotProps={{ clickAwayListener: { mouseEvent: false } }}
    >
      <MuiAlert severity="error" onClose={closeAlert}>
        {msgError}
      </MuiAlert>
    </Snackbar>
  );
};
