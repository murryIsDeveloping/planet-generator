import { Planet, nameGenerator, planetConfig } from "./../generators";
import { combineLatest, merge, pipe, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  withLatestFrom,
  shareReplay,
} from "rxjs/operators";

import { equals, last, trim } from "ramda";
import { eventsService } from "./eventsService";

export const planetService = function(eventsService){
  const initDimension = "";
  const initName = nameGenerator("");

  const nameInput$ = new Subject<string>();
  const dimensionInput$ = new Subject<string>();

  const inputTransformations = pipe(debounceTime(500), map(trim), distinctUntilChanged())

  const dimension$ = dimensionInput$.pipe(inputTransformations, startWith(initDimension));

  const genNameTap$ = eventsService.tap$.pipe(
    filter(equals("generate planet"))
  );

  const nameGenerator$ = merge(
    eventsService.spaceBar$, 
    genNameTap$,
  ).pipe(
    withLatestFrom(eventsService.typing$),
    filter(([_, typing]) => !typing),
    withLatestFrom(dimension$),
    map(last),
    map(nameGenerator)
  )

  const name$ = merge(
    nameInput$.pipe(inputTransformations),
    nameGenerator$,
  ).pipe(
    startWith(initName), 
    shareReplay(1)
  );
  
  const planet$ = combineLatest([name$, dimension$]).pipe(
    map(([name, dimension]) => planetConfig(name, dimension)),
    map((x) => new Planet(x)),
    shareReplay(1),
  );

  const renderSize$ = eventsService.screenResize$.pipe(
    startWith({height: window.innerHeight, width: window.innerWidth}),
    map(({height, width}) => {
    const lg = Math.min((width/2)-80, height-75);
    return width >= 960 ? lg : width
  }));

  return {
    setName: (value: string) => nameInput$.next(value),
    setDimension: (value: string) => dimensionInput$.next(value),
    renderSize$,
    planet$,
    name$
  }
}(eventsService)
