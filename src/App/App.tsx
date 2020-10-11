import React from "react";
import AppToolBar from "./AppToolBar/AppToolBar";
import PlanetRendering from "./Planet/PlanetRendering";
import PlanetDetails from "./Planet/PlanetDetails";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import { eventsService } from "./../services";

const useStyles = makeStyles((theme) => ({
  planet: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto 80px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  spaceBarMessage: {
    backgroundColor: "#ddd",
    padding: "20px",
    textAlign: "center",
    gridColumnStart: 1,
    gridColumnEnd: 3,
    cursor: "pointer"
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div>
        <AppToolBar></AppToolBar>
        <div className={classes.planet}>
          <PlanetRendering></PlanetRendering>
          <PlanetDetails></PlanetDetails>
          <aside className={classes.spaceBarMessage} onClick={() => eventsService.userTap("generate planet")}>
            Click the "Space" Bar to randomly search through some of our planets!
          </aside>
        </div>
    </div>
  );
}

export default App;
