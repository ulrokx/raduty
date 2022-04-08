import axios from "axios";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { Table } from "../components/Table";

interface SchedulesProps {}

export const Schedules: React.FC<SchedulesProps> = ({}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Created",
        accessor: "CreatedAt",
      },
    ],
    []
  );
  const { data, isError, isLoading, error } = useQuery(
    "schedules",
    ({ signal }) => {
      return axios.get(
        "http://localhost:8080/api/v1/schedule/get",
        {
          signal,
        }
      );
    }
  );
  if (isError) {
    if (error) {
        console.log(error)
        return <p>error</p>
    } else {
      return <p>error</p>;
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {data ? (
        <Table data={data.data} columns={columns}></Table>
      ) : null}
    </div>
  );
};
