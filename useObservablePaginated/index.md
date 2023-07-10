# useObservablePaginated

Hook para facilitar o uso de um observable paginado, dá Subscribe e retorna
o resultado junto com funções de manipulação dos parametros.

## Como usar

```tsx
const { params, handleChangePage, handleChangePerPage, handleSort, result, total, isLoading } = useObservablePaginated(
  {
    initialParams: { page: 1, perPage: 5 }, // optional
    infinityScroll: false, // optional
    onChangeParams: params => salesService.list(params)
  },
  []
);
```

## Parâmetros e Retorno

```ts
/**
 * @param options `IUsePaginatedOptions`: {
 *  initialParams: Estado inicial dos paramêtros
 *  infinityScroll: Se os resultados devem ser mergeado, criando uma lista infinita.
 *  onChangeParams: Função que recebe os paramêtros e retorna um Observable
 * }
 * @param deps React deps
 * @returns `IUsePaginatedObservable`: {
 *  params: P / Json com os parametros
 *  initialParams: Partial<P> / Json com os parametros iniciais, útil para um reset de filtros
 *  isLoading: boolean; / Se está carregando ou não
 *  isLoadingMore: boolean; / Se está carregando mais ou não, útil para o infinityScroll
 *  total: number; / Número total de linhas retornadas, apenas a requisição da pagina inicial é necessário retornar o total, as outras paginas podem retonar null
 *  result: R[]; / Array com o resultado
 *  hasMore: boolean; / Se existe mais para ser carregado, calculado com base do total, útil para o infinityScroll
 *  error: any; / Error, se aconteceu algum
 *  retry: () => void; / Função de retry
 *  updateInitialParams: React.Dispatch<React.SetStateAction<P>>; / Útil para alterar o reset de um filtro
 *  mergeParams: (params: PaginationMergeParams<P>) => void; / Função para atualizar os paramentros pode ser o valor em sí o uma função que recebe o valor atual
 *  handleChangePage: (page: number) => void; / Função de atalho para o mergeParams({ page: 1})
 *  handleChangePerPage: (perPage: number) => void; / Função de atalho para o mergeParams({ perPge: 1})
 *  handleSort: (sort: IPaginationParams['sort']) => void; / Função de atalho para o mergeParams({ sort: { field: 'name', direction: 'asc' }  })
 * }
 */
export default function useObservablePaginated<P extends IPaginationParams, R>(options: IUsePaginatedOptions<P, R>, , deps: React.DependencyList): IUsePaginatedObservable<P, R>
```
