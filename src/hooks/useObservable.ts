import { useEffect, useState } from 'react'
import { Observable } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>) => {
    const [state, setState] = useState<T | undefined>();
  
    useEffect(() => {
      const sub = observable.subscribe(setState);
      return () => sub.unsubscribe();
    }, [observable]);
  
    return state;
};