# useObservable

Dá Subscribe e retorna o resultado de um Observable e quando o componente desmonta (unmount) também dá unsubscribe,
diminuindo assim o risco de Memory Leak. **Como useEffect que retorna o valor do Observable**

## Como usar

```tsx
const [value, error, completed, loading] = useObservable(() => userService.get(), []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    {value}
  </div>
);
```

## Cuidados

- O valor inicial será **undefined**, lembre-se de tratar isso quando estiver usando.

## Parâmetros e Retorno

```ts
/**
 * @param observableGenerator Função que retorna um Observable
 * @param deps Lista de dependências
 * @returns [
 *    value: valor de retorno do Observable,
 *    error: se ocorrer um erro, ele será passado aqui,
 *    complete: boolean se o observable foi completado ou não,
 *    loading: boolean se esta carregando ou não, assim que o primeiro valor vier ele será false
 * ]
 */
export default useObservable<T>(observableGenerator: () => Observable<T>, deps: React.DependencyList): [T, any, boolean, boolean];
```
