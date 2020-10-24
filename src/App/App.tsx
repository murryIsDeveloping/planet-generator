import React from "react";
import AppToolBar from "./AppToolBar/AppToolBar";
import PlanetRendering from "./Planet/PlanetRendering";
import PlanetDetails from "./Planet/PlanetDetails";
import { makeStyles } from "@material-ui/core/styles";
import { EventsService } from "./../services";

const useStyles = makeStyles((theme) => ({
  planet: {
    display: "grid",
    gridTemplateColumns: `auto 1fr`,
    gridTemplateRows: "auto auto",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  spaceBar: {
    backgroundColor: "#ddd",
    padding: "20px",
    textAlign: "center",
    gridColumnStart: 1,
    gridColumnEnd: 3,
    cursor: "pointer",
  },
  message: {
    fontSize: "27px",
    fontWeight: 400
  }
}));

function App({service}) {
  const classes = useStyles();

  return (
    <div>
        <AppToolBar></AppToolBar>
        <div className={classes.planet}>
          <PlanetRendering></PlanetRendering>
          <PlanetDetails></PlanetDetails>
          <aside className={classes.spaceBar} onClick={() => service.userTap("generate planet")}>
            <h3 className={classes.message}>Ray Lightyear's Intergalatic and Interdimensional real estate. <br/> Please feel free to browse through our infinite range.</h3>
            <strong>Click here or use the "Space" Bar to randomly search through some of our planets!</strong>
          </aside>
        </div>
    </div>
  );
}

export default EventsService.withService(App);
