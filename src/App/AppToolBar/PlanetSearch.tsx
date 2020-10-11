import React, { useEffect, useState } from "react";
import { planetService, eventsService } from "src/services";
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
    planetService.setName(name);
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
        onFocus={() => eventsService.userTyping(true)}
        onBlur={() => eventsService.userTyping(false)}
        value={name}
      />
    </div>
  );
}
