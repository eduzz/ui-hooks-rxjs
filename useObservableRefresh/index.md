# useObservableRefresh

Um **useObservable** que retorna uma função de refresh para recarregar, útil na trativa de erros ou refresh.

## Como usar

```tsx
const [value, error, completed, loading, refresh] = useObservableRefresh(() => userService.get(), []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    {value}
    <Button onClick={refresh} variant='text'>
      Refresh
    </Button>
  </div>
);
```

<Playground>
  {() => {
    const [value, error, completed, refresh] = useObservableRefresh(() => interval(1000).pipe(take(10)), []);
    return (
      <div>
        <Typography>Value: {value}</Typography>
        <Typography>Completed: {completed.toString()}</Typography>
        <Button onClick={refresh} variant='text'>
          Refresh
        </Button>
      </div>
    );
  }}
</Playground>

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
 *    loading: boolean se esta carregando ou não,
 *    refresh: function para recarregar
 * ]
 */
export default useObservableRefresh<T>(observableGenerator: () => Observable<T>, deps: React.DependencyList): [T, any, boolean, boolean, () => void];
```
