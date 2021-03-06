import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GroupForm } from "../components/GroupForm";
import { GroupsTable } from "../components/GroupsTable";
import { Loader } from "../components/Loader";

interface GroupsProps {}

export const Groups: React.FC<GroupsProps> = ({}) => {
  const { data, isError, isLoading, error } = useQuery(
    "groups",
    ({ signal }) => {
      return axios.get(
        "http://localhost:8080/api/v1/groups/get",
        { signal }
      );
    }
  );
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>error</div>;
  }
  return (
    <>
      <div>
        {data?.data ? <GroupsTable data={data.data} /> : null}
      </div>
      <div>
        <GroupForm groups={data?.data}/>
      </div>
    </>
  );
};
