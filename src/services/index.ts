import {eventsService} from "./eventsService";
import {planetService} from "./planetService";
import { Service } from "./serviceProvider";

export * from "./serviceProvider";

export const PlanetService = Service(planetService, "planetService");
export const EventsService = Service(eventsService, "eventsService");