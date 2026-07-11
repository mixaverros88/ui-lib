/**
 * One header cell of a BaseTable. `align: 'right'` right-aligns the header
 * (numeric columns); body cells are the caller's markup and align themselves.
 */
export interface TableColumn {
  label: string
  align?: 'left' | 'right'
}
