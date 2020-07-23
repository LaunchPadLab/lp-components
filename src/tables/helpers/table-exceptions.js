// Table Exceptions...a1

// Column-related exceptions
export class TableColumnError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TableColumnError'
  }
}
