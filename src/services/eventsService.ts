import { Subject, fromEvent, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const eventsService = function(){
    const typing$ = new BehaviorSubject<boolean>(false)
    const tap$ = new Subject()

    const spaceBar$ = fromEvent(document, 'keydown').pipe(
        filter((x: any) => x.code === "Space"),
        tap((x) => x.preventDefault())
    )

    return {
        userTyping: (typing: boolean) => typing$.next(typing),
        userTap: (message: "generate planet") => tap$.next(message),
        typing$: typing$.asObservable(),
        spaceBar$: spaceBar$, 
        tap$: tap$.asObservable(),
    }
}()