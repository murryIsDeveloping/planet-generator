import React, { useState } from "react";
import { planetService, eventsService } from "src/services";
import { InputBase } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import { InputStyles } from "./searchStyles";

export default function DimensionSearch() {
  const classes = InputStyles();
  const [dimension, updateDimension] = useState("");

  function dimensionName(evt: any) {
    const name = evt.target.value;
    if (/^[0-9a-fA-F]+$/.test(name) || name === "") {
      updateDimension(name);
      planetService.setDimension(name);
    }
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
        onFocus={() => eventsService.userTyping(true)}
        onBlur={() => eventsService.userTyping(false)}
        value={dimension}
      />
    </div>
  );
}
