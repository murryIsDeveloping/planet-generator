import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DimensionSearch from './DimensionSearch';
import PlanetSearch from './PlanetSearch';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: "30px",
    fontFamily: ["Anton", "san-serif"].join(","),
    textAlign: 'left',
    width: '100%',
  },
});

export default function AppToolBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Ray Lightyear
          </Typography>
          <PlanetSearch></PlanetSearch>
          <DimensionSearch></DimensionSearch>
        </Toolbar>
      </AppBar>
    </header>
    </React.Fragment>
  );
}