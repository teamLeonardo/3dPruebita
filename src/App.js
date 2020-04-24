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
  const [led, setLed] = React.useState({});
  const [posi, setPosi] = React.useState(100);
  const changePage = async newPage => {
    await setPage(newPage);
  };
  useEffect(() => {
    validarStade(".contenedor1").then(e => {
      setContPage(e);
    });

    for (let index = 0; index < posi; index = index + 0.1) {
      aumetarPosi(index);
    }
  });

  const aumetarPosi = async indice => {
    await setPosi(indice);
  };
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
  const changeLed = e => {
    let text1 = document.querySelector("#inputInterbal1").value;
    let text2 = document.querySelector("#inputInterbal2").value;
    let text3 = document.querySelector("#inputInterbal3").value;

    setLed({
      inter1: [0, Number(text1)],
      inter2: [0, Number(text2)],
      inter3: [0, Number(text3)]
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
          <br />
          <label for="inputInterbal1">pin 1</label>
          <br />
          <input
            type="text"
            id="inputInterbal1"
            placeholder="10 o 100 o 1000 >"
          />
          <br />
          <label for="inputInterbal2">pin 2</label>
          <br />
          <input
            type="text"
            id="inputInterbal2"
            placeholder="10 o 100 o 1000 >"
          />
          <br />
          <label for="inputInterbal3">pin 3</label>
          <br />
          <input
            type="text"
            id="inputInterbal3"
            placeholder="10 o 100 o 1000 >"
          />
          <br />
          <button onClick={changeLed}>guardar</button>
        </div>
      </TabPanel>
      <TabPanel value={page} index={1}>
        <div className={"contenedor2"}>
          <h2>OPTENER TITLE : </h2>
          <textarea id="w3mission" rows="4" cols="50" />
        </div>
      </TabPanel>
      <TabPanel className={"simuladorPanel"} value={page} index={2}>
        <MasterCanvas intervalo={led} />
      </TabPanel>
    </div>
  );
}
