export interface Connection {
  open: () => Promise<boolean>
  query: (sql: string) => Promise<any>
  close: () => Promise<void>
}
