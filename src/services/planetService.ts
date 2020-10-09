import { Planet, nameGenerator, planetConfig } from "./../generators";
import { combineLatest, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  withLatestFrom,
  shareReplay
} from "rxjs/operators";
import {
  planetNameInput$,
  typing$,
  dimensionNameInput$,
  spaceBar$,
} from "./userInputs";
import { last } from "ramda";

const planetName$ = planetNameInput$.pipe(
  debounceTime(500),
  map((x) => x.trim()),
  distinctUntilChanged(),
);

const dimensionName$ = dimensionNameInput$.pipe(
  debounceTime(500),
  map((x) => x.trim()),
  distinctUntilChanged(),
  startWith("")
);

const planetFromGenerator$ = spaceBar$.pipe(
  withLatestFrom(typing$),
  filter(([_, typing]) => !typing),
  withLatestFrom(dimensionName$),
  map(last),
  map(nameGenerator)
);

const name$ = merge(planetName$, planetFromGenerator$).pipe(distinctUntilChanged(), share());

const planet$ = combineLatest([name$, dimensionName$]).pipe(
  startWith([nameGenerator(""), ""]),
  map(([name, dimension]) => planetConfig(name, dimension)),
  map((x) => new Planet(x)),
  shareReplay(1),
);

export const planetService = {
  planet$: planet$,
  planetName$: name$,
  demensionName$: dimensionName$,
  setPlanet: (x: string) => planetNameInput$.next(x),
  setDimension: (x: string) => dimensionNameInput$.next(x),
};
