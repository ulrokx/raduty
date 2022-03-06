import React, { useMemo } from "react";
import {
  useTable,
  useFlexLayout,
  useExpanded,
} from "react-table";

interface GroupsTableProps {
  data: any;
}

export const GroupsTable: React.FC<GroupsTableProps> = ({
  data,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Group ID",
        accessor: "ID",
      },
      { Header: "Name", accessor: "Name" },
      { Header: "Created At", accessor: "CreatedAt" },
      { Header: "Members", accessor: "Assistant.length" },
    ],
    []
  );
  const dataDates = useMemo(
    () =>
      data.map((e: any) => {
        return { ...e, CreatedAt: new Date(e.CreatedAt).toDateString() };
      }),
    []
  );
  const tableInstance = useTable(
    { columns, data: dataDates },
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
    <>
      {data ? (
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
      ) : null}
    </>
  );
};
