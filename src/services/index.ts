import {eventsService} from "./eventsService";
import {planetService} from "./planetService";
import ServiceProvider from "./serviceProvider";

export const PlanetService = ServiceProvider(planetService);
export const EventsService = ServiceProvider(eventsService);