import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Column, useFlexLayout, useTable } from "react-table";
interface AssistantsProps {}
export const Assistants: React.FC<AssistantsProps> = ({}) => {
  const columns = useMemo(
    () =>
      [
        { Header: "ID", accessor: "cwid" },
        { Header: "First", accessor: "first" },
        { Header: "Last", accessor: "last" },
        { Header: "Updated", accessor: "UpdatedAt" },
      ] as Array<Column>,
    []
  );
  const [assistants, setAssistants] = useState([]);
  const { data, isError, isLoading, error } = useQuery(
    "assistants",
    ({ signal }) => {
      return axios.get(
        "http://localhost:6969/api/v1/assistants/all",
        { signal }
      );
    }
  );
  useEffect(() => {
    if (data?.data) {
      const toSet = data.data.map((r: any) => {
        const UpdatedAt = new Date(
          r.UpdatedAt
        ).toLocaleDateString();
        return {
          ...r,
          UpdatedAt,
        };
      });
      setAssistants(toSet);
    }
  }, [data]);
  const tableInstance = useTable(
    { columns, data: assistants },
    useFlexLayout
  );
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>error: {error}</div>;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <table {...getTableProps()} className="w-full border-2 shadow-lg">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="bg-red-200 border-2 border-black-500 p-1">
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
            <tr {...row.getRowProps()} className="hover:bg-slate-400 odd:bg-white even:bg-slate-200 py-1">
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
