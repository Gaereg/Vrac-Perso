import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./Sport.module.css";
import { useState } from "react";
import NestedItemList from "@components/NestedItemList/NestedItemList";
import { Container, IconButton } from "@mui/material";
import classNames from "classnames";
import ModalAdd from "@pages/Sport/ModalAdd/ModalAdd";

const Sport = () => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleToggleNavOpen = () => setIsNavOpen((state) => !state);

  const handleOpenModalAdd = () => setIsModalAddOpen(true);
  const handleCloseModalAdd = (isAlertClose) => {
    console.log(isAlertClose);
    
    if (isAlertClose) setIsAlertModalOpen(true)
    else setIsModalAddOpen(false)
  };

  return (
    <Box className={styles.pageWrapper}>
      <Box
        className={classNames(styles.listWrapper, {
          [styles.listWrapperOpen]: isNavOpen,
        })}
      >
        <List
          className={styles.navList}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Button aria-label="create" fullWidth onClick={handleOpenModalAdd}>
            <AddIcon />
            Ajouter
          </Button>
          <NestedItemList
            name="Semaine 1"
            items={[{ name: "Sceance 1", callback: () => null }]}
          />
        </List>
        <Divider orientation="vertical" className={styles.divider} textAlign="left">
          <IconButton onClick={handleToggleNavOpen}>
            {isNavOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </Divider>
      </Box>
      <Box
        className={classNames(styles.contentWrapper, {
          [styles.contentWrapperNavOpen]: isNavOpen,
        })}
      >
        <Container maxWidth="xl">TOTO</Container>
      </Box>
        <ModalAdd isOpen={isModalAddOpen} closeModal={handleCloseModalAdd}/>
    </Box>
  );
};

export default Sport;
