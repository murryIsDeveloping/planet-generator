import { makeStyles } from '@material-ui/core';
import React from 'react'
import { Planet, PlanetStatus } from 'src/generators';
import { useObservable } from 'src/hooks/useObservable';
import { PlanetService, withServices } from 'src/services';
import DimensionRules from './DimensionRules';

const useStyles = makeStyles({
    details: {
        position: "relative",
        padding: "30px",
        letterSpacing: "3px",
    },
    title: {
        fontSize: "34px",
    },
    resources: {
        listStyle: "none",
        fontSize: "20px",
    },
    resource: {
        textTransform: "capitalize",
        fontWeight: "bold",
    }
  });

const extendedStatus = (status: PlanetStatus, name: string) => {
    switch(status){
        case "Not Found":
            return `I'm afriad that ${name} can't be found`
        case "Supernova'd":
            return `${name} has Supernova'd. Now it looks like it may just be the beginings of a black hole`
        default:
            return `${status}`
    }
}

export function PlanetDetails({planetService}){
    const classes = useStyles();
    const planet: Planet = useObservable(planetService.planet$);
    const noDetails = planet?.status === "Not Found" || planet?.status === "Supernova'd"
    const price = noDetails ? null : <h2 className={classes.title}>${planet?.price.toLocaleString()}</h2>;
    const resourceTypes: ("liquid" | "gas" | "minerals" | "ring")[] = ["minerals", "liquid", "gas", "ring"]

    const resources = noDetails ? null : (
        <ul className={classes.resources}>
            {resourceTypes.map((val, index)  => (
                <li key={index} className={classes.resource}>{val}: {planet?.resourceLevel(val)}</li>
            ))}
        </ul>
    )

    return (
        <div className={classes.details}>
            <DimensionRules></DimensionRules>
            <h1 className={classes.title}>{planet?.name}</h1>
            {price}
            <h2>{extendedStatus(planet?.status, planet?.name)}</h2>
            {resources}
        </div>
    ) 
}

export default withServices(PlanetDetails, [PlanetService])