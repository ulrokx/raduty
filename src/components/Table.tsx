import { AxiosResponse } from "axios";
import { Column, useFlexLayout, useTable } from "react-table";

interface ITable {
  columns: Column<{}>[];
  data: any;
}

export const Table: React.FC<ITable> = ({ columns, data }) => {
  const tableInstance = useTable(
    { columns, data },
    useFlexLayout
  );
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    rows,
  } = tableInstance;
  return (
    <table
      {...getTableProps()}
      className="w-full border-2 shadow-lg">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="bg-red-200 border-2 border-black-500 p-1">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="hover:bg-slate-400 odd:bg-white even:bg-slate-200 py-1">
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
