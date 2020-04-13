import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ScrollableTabsButtonForce from "./components/barra/Barra";
import TabPanel from "./components/body/Body";
import MasterCanvas from "./components/CptThreeJS/newCanva.js";
import "./styles.css";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inputTesto: {
    width: "100px"
  }
}));

export default function App(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [contPage, setContPage] = React.useState("");

  const changePage = async newPage => {
    await setPage(newPage);
  };
  useEffect(() => {
    validarStade(".contenedor1").then(e => {
      setContPage(e);
    });
  });
  const validarStade = async buscar => {
    return await new Promise(resolve => {
      const intervalo = setInterval(() => {
        const textarea = document.querySelector(buscar);
        if (textarea) {
          resolve(textarea);
          clearInterval(intervalo);
        }
      }, 0);
    });
  };
  const getPage1 = async () => {
    validarStade(".contenedor1").then(e => {
      setContPage(e);
    });
    validarStade("#w3mission").then(e => {
      e.value = contPage.innerHTML;
    });
  };
  return (
    <div className={"App " + classes.root}>
      <ScrollableTabsButtonForce
        page={page}
        changePage={changePage}
        clickEnCodigo={getPage1}
      />
      <TabPanel value={page} index={0}>
        <div className={"contenedor1"}>
          <h2>pagina 1</h2>
          <h2>pagina 1</h2>
          <h2>pagina 1</h2>
          <h2>pagina 1</h2>
        </div>
      </TabPanel>
      <TabPanel value={page} index={1}>
        <div className={"contenedor2"}>
          <h2>OPTENER TITLE : </h2>
          <textarea id="w3mission" rows="4" cols="50" />
        </div>
      </TabPanel>
      <TabPanel className={"simuladorPanel"} value={page} index={2}>
        <MasterCanvas />
      </TabPanel>
    </div>
  );
}
