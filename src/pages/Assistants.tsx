import axios from "axios";
import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { GridLoader } from "react-spinners";
import { Column, useFlexLayout, useTable } from "react-table";
import { Loader } from "../components/Loader";
import { Table } from "../components/Table";
interface AssistantsProps {}
export const Assistants: React.FC<AssistantsProps> = ({}) => {
  const columns = useMemo(
    () =>
      [
        { Header: "ID", accessor: "cwid" },
        { Header: "First", accessor: "first" },
        { Header: "Last", accessor: "last" },
        { Header: "Updated", accessor: "UpdatedAt" },
        { Header: "Group ID", accessor: "groupId" },
        { Header: "Group", accessor: "group.Name" },
      ] as Array<Column>,
    []
  );
  const [assistants, setAssistants] = useState([]);
  const { data, isError, isLoading, error } = useQuery(
    "assistants",
    ({ signal }) => {
      return axios.get(
        "http://localhost:8080/api/v1/assistants/all",
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
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>error: {error}</div>;
  }
  console.log(data);
  return (
    <>
      {data ? (
        <Table data={assistants} columns={columns}></Table>
      ) : (
        <Loader />
      )}
    </>
  );
};
