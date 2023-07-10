import { DependencyList, useState, useEffect, useCallback } from 'react';

import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

type ExtractObservableValue<P> = P extends Observable<infer T> ? T : never;

/**
 * Create a memoized callback that uses an observable and unsubscribe automatically if component unmount
 * @param observableCallback Function to return a observable
 * @param deps List of deps
 * @returns [callbackFunction, observableValue, error, complete, loading]
 */
export default function useObservableCallback<T, F extends (...args: any[]) => Observable<T>>(
  observableCallback: F,
  deps: DependencyList
): [(...a: Parameters<F>) => void, ExtractObservableValue<ReturnType<F>> | undefined, any, boolean, boolean] {
  const [value, setValue] = useState<ExtractObservableValue<ReturnType<F>> | undefined>(undefined);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [submitted$] = useState(() => new Subject<{ callback: F; args: Parameters<F>[]; deps: DependencyList }>());

  useEffect(() => {
    const sub = submitted$
      .pipe(
        switchMap(({ callback, args }) => {
          setValue(undefined);
          setError(undefined);
          setCompleted(false);
          setLoading(true);

          return callback(...args);
        }),
        tap({
          next: data => {
            setValue(() => data as any);
            setError(undefined);
            setLoading(false);
          },
          error: err => {
            setValue(undefined);
            setError(err);
            setLoading(false);
          },
          complete: () => {
            setCompleted(true);
            setLoading(false);
          }
        })
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [submitted$]);

  const callback = useCallback(
    (...args: Parameters<F>) => {
      setLoading(true);
      submitted$.next({ callback: observableCallback, args, deps });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return [callback, value, error, completed, loading];
}
