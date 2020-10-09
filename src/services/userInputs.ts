import { Subject, fromEvent, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const spaceBar$ = fromEvent(document, 'keydown').pipe(
    filter((x: any) => x.code === "Space"),
    tap((x) => x.preventDefault())
)

export const planetNameInput$ = new Subject<string>()
export const dimensionNameInput$ = new Subject<string>()
export const typing$ = new BehaviorSubject<boolean>(false)