# useObservableEffect

Dá Subscribe em um Observable mas não retorna ou altera o estado
e quando o componente desmonta (unmount) também dá unsubscribe,
diminuindo assim o risco de Memory Leak. **Como useEffect que retorna o valor do Observable**

## Como usar

```tsx
useObservableEffect(() => userService.doSomething(), []);

return <div>nothing will change or render</div>;
```

## Cuidados

- **Erros** ocorridos serão automaticamentes logados (não tratados) se as o **onUnhandledError** no **setHoustonHooksConfig**
  for setado, mas se utilizar o operador catchError esse erro não será logado pois foi previamente tratado,
  nesse caso o log deve ser feito manualmente.

## Parâmetros e Retorno

```ts
/**
 * @param observableGenerator Função que retorna um Observable
 * @param deps Lista de dependências
 * @returns void / nada
 */
export default useObservableEffect<T>(observableGenerator: () => Observable<T>, deps: React.DependencyList): void;
```
