import { ReactNode, useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import DialogAlert from "@components/DialogAlert/DialogAlert";

const NestedItem = ({
  title,
  openDefault = true,
  onDelete,
  children,
}: {
  title: string;
  openDefault: boolean;
  onDelete?: () => void;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggleItem = () => setIsOpen((state: boolean) => !state);
  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAlertOpen(true);
  };
  const handleCancelAlert = () => setIsAlertOpen(false);
  const deleteItem = () => {
    if (onDelete) onDelete();
    handleCancelAlert();
  };

  useEffect(() => {
    setIsOpen(openDefault)
  },[setIsOpen, openDefault])

  return (
    <>
      <ListItemButton onClick={toggleItem}>
        <ListItemText primary={title} />
        {onDelete && (
          <IconButton aria-label="supprimer" onClick={handleClickDelete} sx={{ mr: 2 }}>
            <DeleteIcon />
          </IconButton>
        )}
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {children}
      </Collapse>

      {onDelete && (
        <DialogAlert
          isOpen={isAlertOpen}
          confirm={deleteItem}
          cancel={handleCancelAlert}
          title={`Voulez-vous vraiment supprimer ${title} ?`}
          content="Tous travail non sauvegardé sera perdu"
        />
      )}
    </>
  );
};

export default NestedItem;
