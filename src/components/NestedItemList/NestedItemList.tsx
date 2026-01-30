import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import NestedItem from "@components/NestedItem/NestedItem";

type TItems = {
  name: string;
  callback: (name: string) => void;
}[];

const NestedItemList = ({ name, items }: { name: string; items: TItems }) => {
  return (
    <>
      <NestedItem name={name}>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItemButton sx={{ pl: 4 }} key={item.name}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </NestedItem>
    </>
  );
};

export default NestedItemList;
