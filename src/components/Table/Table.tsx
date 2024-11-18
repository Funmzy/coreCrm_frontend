/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, Header, Row, Table } from "@tanstack/react-table";

type TableProps = {
  tableInstance: Table<any>;
};

const DataTable = (props: TableProps) => {
  const { tableInstance } = props;
  return (
    <div className="tableFixHead bg-white p-6 rounded-md shadow-sm">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                return (
                  <th
                    key={header.id}
                    data-header-id={header.id}
                    data-sorted={header.column.getIsSorted() ? true : null}
                    colSpan={header.colSpan}
                    className={(header.column.columnDef as any).className}
                    role={canSort ? "button" : "columnheader"}
                    onKeyDown={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <RenderHeaderColumn header={header} />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="">
          <TableBody rows={tableInstance.getRowModel().rows} />
        </tbody>
      </table>
    </div>
  );
};

const RenderHeaderColumn = (props: { header: Header<any, unknown> }) => {
  const { header } = props;
  return <>{header.column.columnDef.header}</>;
};

type TableBodyProps = {
  rows: Row<any>[];
};

const TableBody = (props: TableBodyProps) => {
  const { rows } = props;
  return rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ));
};

export default DataTable;
