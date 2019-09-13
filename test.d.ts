/// <reference types="react" />
import { Dispatch, SetStateAction, ReactNode } from 'react';

declare module 'react-table' {

  // TODO
  export type utils = any

  interface Cell<Data> {
    render: (type: string) => any;
    getCellProps: () => any;
    column: Column<Data>;
    row: Row<Data>;
    state: any;
    value: any;
  }
  interface Row<Data> {
    index: number;
    cells: Cell<Data>[];
    getRowProps: () => any;
    original: Data;
  }

  export interface defaultColumn {
    Cell: (cell: Cell<any>) => string
    show: true
  }


  // WHY NEVER?
  interface HeaderColumn<Data, Key extends Extract<keyof Data, string> = never> {
    /**
     * This string/function is used to build the data model for your column.
     */
    accessor: Key | ((originalRow: Data) => string);
    Header?: string | ((props: TableInstance<Data>) => ReactNode);
    Filter?: string | ((props: TableInstance<Data>) => ReactNode);
    Cell?: string | ((cell: Cell<Data>) => ReactNode);

    /**
     * This is the unique ID for the column. It is used by reference in things like sorting, grouping, filtering etc.
     */
    id?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    width?: string | number;
    canSortBy?: boolean;
    sortByFn?: (a: any, b: any, desc: boolean) => 0 | 1 | -1;
    defaultSortDesc?: boolean;
  }


  interface Hooks<Data> {
    columnsBeforeHeaderGroups: any[]
    columnsBeforeHeaderGroupsDeps: any[]
    useMain: any[]
    useRows: any[]
    prepareRow: any[]
    getTableProps: any[]
    getRowProps: any[]
    getHeaderGroupProps: any[]
    getHeaderProps: any[]
    getCellProps: any[]
  }

  type Plugin<Data> = (instanceHooks: Hooks<Data>):  void
  
  interface TableInstance<Data> extends TableOptions<Data> {
    hooks: Hooks<Data>
    plugins: Plugin[]
  }

  export interface UseTableOptions<Data> {
    data: Data[]
    columns: HeaderColumn<Data>[],
    // TODO
    state?: any
    /**
     * @default {}
     */
    defaultColumn?: object
    getSubRows?: (row: any, index: number) => any[]
    getRowID?: (row: any, index: number) => number
    debug?: boolean
  }

  export function useTable<Data>(options: TableOptions<Data>, ...plugins: Plugin<Data>[]): TableInstance<Data>

  export type TableStateOptions = Partial<{
      reducer: (oldState: object, newState: object) => object
      useState: [any, Dispatch<SetStateAction<any>>]
    }>

  export function useTableState(initialState?: object, overrides: object, options?: TableStateOptions): any

  export type defaultState = {}


  interface UseExpandedOptions {
    manualExpandedKey?: string
    paginateExpandedRows?: boolean
  }
  export function useExpanded<Data>(hooks: Hooks<Data>): any


  interface UseFiltersOptions {
    flatColumns: any
    filterTypes: any
    manualFilters: any
    disableFilters: any

  }
  export function useFilters<Data>(hooks: Hooks<Data>): any

  export function useGroupBy<Data>(hooks: Hooks<Data>): any

  export function useSortBy<Data>(hooks: Hooks<Data>): void

  export function usePagination<Data>(hooks: Hooks<Data>): any

  export function useRowSelect<Data>(hooks: Hooks<Data>): any

  export function useRowState<Data>(hooks: Hooks<Data>): any

  export function useColumnOrder<Data>(hooks: Hooks<Data>): any


  type Action = string

  export type actions = Record<Action, string>

  export function addActions(...actions: Action[]): void
}
