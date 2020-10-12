import { head } from 'ramda';
import { Subject, fromEvent, BehaviorSubject } from 'rxjs';
import { filter, map, tap, withLatestFrom, debounceTime } from 'rxjs/operators';

export const eventsService = function(){
    const typing$ = new BehaviorSubject<boolean>(false)
    const tap$ = new Subject()

    const spaceBar$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        withLatestFrom(typing$),
        filter(([x, isTyping]) => x.code === "Space" && !isTyping),
        map(head),
        tap((x: KeyboardEvent) => x.preventDefault())
    )

    const screenResize$ = fromEvent(window, 'resize').pipe(
        debounceTime(300),
        map((x: any) => ({
                width: x.target.innerWidth,
                height: x.target.innerHeight
        }))
    );

    screenResize$.subscribe((x) => console.log(x))

    return {
        userTyping: (typing: boolean) => typing$.next(typing),
        userTap: (message: "generate planet") => tap$.next(message),
        typing$: typing$.asObservable(),
        spaceBar$: spaceBar$, 
        tap$: tap$.asObservable(),
        screenResize$: screenResize$,
    }
}()