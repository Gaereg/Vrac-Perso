import { ReactNode, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

const NestedItem = ({
  name,
  openDefault = true,
  children,
}: {
  name: string;
  openDefault: boolean;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(openDefault);

  const toggleItem = () => setIsOpen((state: boolean) => !state);

  return (
    <>
      <ListItemButton onClick={toggleItem}>
        <ListItemText primary={name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

export default NestedItem;
