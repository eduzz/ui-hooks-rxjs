import { DependencyList, useState, useCallback, useEffect } from 'react';

import type { Observable } from 'rxjs';

/**
 * Create a memoized observable and unsubscribe automatically if component unmount, first value will be undefined
 * @param observableGenerator Function to return a observable
 * @param deps List of deps
 * @returns [observableValue, error, complete, loading]
 */
export default function useObservable<T>(
  observableGenerator: () => Observable<T>,
  deps: DependencyList
): [T | undefined, any | undefined, boolean, boolean] {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cb = useCallback(observableGenerator, deps);

  useEffect(() => {
    setValue(undefined);
    setError(undefined);
    setComplete(false);
    setLoading(true);

    const sub = cb().subscribe({
      next: (data: T) => {
        setValue(() => data);
        setError(undefined);
        setLoading(false);
      },
      error: err => {
        setValue(undefined);
        setError(err);
        setLoading(false);
      },
      complete: () => {
        setComplete(true);
        setLoading(false);
      }
    });
    return () => sub.unsubscribe();
  }, [cb]);

  return [value, error, complete, loading];
}
