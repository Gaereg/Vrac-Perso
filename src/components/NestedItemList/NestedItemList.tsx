import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

type TItems = {
  name: string;
  callback: (name: string) => void;
}[];

const NestedItemList = ({ name, items }: { name: string; items: TItems }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleItem = () => setIsOpen((state: boolean) => !state);

  return (
    <>
      <ListItemButton onClick={toggleItem}>
        <ListItemText primary={name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NestedItemList;
