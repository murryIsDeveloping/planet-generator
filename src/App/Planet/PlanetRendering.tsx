import React, { useRef } from "react";
import { planetScene } from "../../renderer/scene";
import { makeStyles } from "@material-ui/core";
import { useObservable } from "src/hooks/useObservable";
import { EventsService, PlanetService, withServices } from "src/services";
import { Planet } from "src/generators";

const useStyles = makeStyles({
  wrapper: {
    overflow: 'hidden',
    position: "relative",
  },
  banner: {
    position: "absolute",
    fontSize: "45px",
    textTransform: "uppercase",
    backgroundColor: "red",
    color: "white",
    transform: "rotate(-40deg)",
    padding: "20px 150px",
    top: "70px",
    left: "-135px",
    width: "200px",
    textAlign: 'center',
    fontFamily: ["Anton", "san-serif"].join(","),
  },
});

export function PlanetRendering({eventsService, planetService}) {
  const classes = useStyles();
  const mount = useRef(null);
  const planet: Planet = useObservable(planetService.planet$);

  if (mount.current && !planetScene.init) {
    planetScene.createScene(mount.current);
  }

  if (planet) {
    planetScene.addPlanet(planet);
  }

  return (
    <div className={classes.wrapper} onTouchEnd={(_) => eventsService.userTap("generate planet")}>
      <div className={classes.banner}>{planet?.status}</div>
      <div ref={mount}></div>
    </div>
  );
}

export default withServices(PlanetRendering, [PlanetService, EventsService])
