import { DependencyList, useEffect } from 'react';

import { Observable } from 'rxjs';

/**
 * Just subscribe an observable and unsubscribe automatically if component unmount, no value/state is changed
 * @param observableGenerator Function to return a observable
 * @param deps List of deps
 * @returns void
 */
export default function useObservableEffect<T>(observableGenerator: () => Observable<T>, deps: DependencyList): void {
  useEffect(() => {
    const sub = observableGenerator().subscribe();
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
