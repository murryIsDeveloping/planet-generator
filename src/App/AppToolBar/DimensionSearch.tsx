import React, { useState } from "react";
import { planetService } from "src/services/planetService";
import { InputStyles } from "./searchStyles";
import { typing$ } from "./../../services/userInputs";
import { InputBase } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";

export default function DimensionSearch() {
  const classes = InputStyles();
  const [dimension, updateDimension] = useState("");

  function dimensionName(evt: any) {
    const name = evt.target.value;
    if (/^[0-9a-f]+$/.test(name) || name === "") {
      updateDimension(name);
      planetService.setDimension(name);
    }
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
        <Fingerprint />
      </div>
      <InputBase
        placeholder="Dimension"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "Search Dimensions" }}
        onChange={dimensionName}
        onFocus={focused}
        onBlur={blured}
        value={dimension}
      />
    </div>
  );
}
