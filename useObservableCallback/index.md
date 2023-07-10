# useObservableCallback

Retorn um callback que dará Subscribe e retornará o resultado de um Observable e quando o componente desmonta (unmount) também dá unsubscribe,
diminuindo assim o risco de Memory Leak. **Como useEffect que retorna o valor do Observable**

## Como usar

```tsx
const [callback, value, error, completed, loading] = useObservableCallback(() => userService.get(), []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    {value}
    <button onClick={callback}>iniciar</button>
  </div>
);
```

## Cuidados

- O valor inicial será **undefined**, lembre-se de tratar isso quando estiver usando.

## Parâmetros e Retorno

```ts
/**
 * @param observableCallback Função que retorna um Observable
 * @param deps Lista de dependências
 * @returns [
 *    callback: callback que inicia o Observable
 *    value: valor de retorno do Observable,
 *    error: se ocorrer um erro, ele será passado aqui,
 *    complete: boolean se o observable foi completado ou não,
 *    loading: boolean se esta carregando ou não, assim que o primeiro valor vier ele será false
 * ]
 */
export default function useObservableCallback<T, F extends (...args: any[]) => Observable<T>>(
  observableCallback: F,
  deps: React.DependencyList
): [(...a: Parameters<F>) => void, ExtractObservableResult<ReturnType<F>>, any, boolean, boolean];
```
