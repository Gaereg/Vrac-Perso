import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DialogAlert = ({
  isOpen,
  cancel,
  confirm,
  title,
  content,
}: {
  isOpen: boolean;
  cancel: () => void;
  confirm: () => void;
  title: string;
  content: string;
}) => {
  return (
    <Dialog open={isOpen} onClose={cancel} aria-labelledby="alert-dialog">
      <DialogTitle id="alert-dialog-title" color="textPrimary">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="textSecondary">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} autoFocus>
          Annuler
        </Button>
        <Button onClick={confirm} variant="contained">Confirmer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
