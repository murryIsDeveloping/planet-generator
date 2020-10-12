import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  rules: {
    position: "absolute",
    top: "10px",
    right: "20px",
  },
});

export default function DimensionRules() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <React.Fragment>
      <Button className={classes.rules} color="primary" onClick={handleOpen}>
        Dimension Rules
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Dimension Rules</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <p><strong>'0': Enthusiastic Dimension</strong> - Name must end with a !</p> 
              <p><strong>'1': Ring Dimension</strong> - 20% more ringed planets</p> 
              <p><strong>'2': Desert Dimension</strong> - 30% less water</p> 
              <p><strong>'3': Little Bits Dimension</strong> - 30% smaller planets</p> 
              <p><strong>'4': Bit of a dodgy neighbourhood Dimension</strong> - Prices are 25% cheaper</p> 
              <p><strong>'5': Smug Dimension</strong> - Prices are 20% higher</p>  
              <p><strong>'6': Shiny Dimension</strong> - 15% more minerals</p> 
              <p><strong>'7': It's so detailed Dimension</strong> - 20% more detail 10% more expensive</p> 
              <p><strong>'8': Selling out fase Dimension</strong> - 30% more likely property has already sold</p> 
              <p><strong>'9': Old Dimension</strong> - 5 times as likely property has supernova'd</p> 
              <p><strong>'A': Land Dimension</strong> - Names must end in ' Land'</p> 
              <p><strong>'B': Low Poly Dimension</strong> - 20% less detail and 20% cheaper</p> 
              <p><strong>'C': Schrodinger's Cat Dimension</strong> - Cats everywhere!</p> 
              <p><strong>'D': Sm-Dimension</strong> - Name must start with 'Sm-'</p> 
              <p><strong>'E': Box Dimension</strong> - Name must start with '[' end with ']' half the detail</p> 
              <p><strong>'F': Fart Dimension</strong> - 10% cheaper more water and gas</p> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
