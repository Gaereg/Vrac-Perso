import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import NestedItem from "@components/NestedItem/NestedItem";

type TItems = {
  title: string;
  callback: (title: string) => void;
}[];

const NestedItemList = ({ title, items }: { title: string; items: TItems }) => {
  return (
    <>
      <NestedItem title={title} openDefault>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItemButton sx={{ pl: 4 }} key={item.title}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </NestedItem>
    </>
  );
};

export default NestedItemList;
