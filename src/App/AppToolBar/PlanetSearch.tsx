import React, { useEffect, useState } from "react";
import { planetService } from "src/services/planetService";
import { typing$ } from "./../../services/userInputs";
import { Public } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import { InputStyles } from "./searchStyles"

export default function PlanetSearch() {
  const classes = InputStyles();
  const [name, updateName] = useState("");

  useEffect(() => {
    const sub = planetService.planetName$.subscribe(updateName);
    return () => sub.unsubscribe();
  }, []);

  function setPlanet(evt: any) {
    const name = evt.target.value;
    updateName(name);
    planetService.setPlanet(name);
  }

  function focused(evt: any) {
    typing$.next(true);
  }

  function blured(evt: any) {
    typing$.next(false);
  }
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Public />
      </div>
      <InputBase
        placeholder="Planet"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "Search Planets" }}
        onChange={setPlanet}
        onFocus={focused}
        onBlur={blured}
        value={name}
      />
    </div>
  );
}
