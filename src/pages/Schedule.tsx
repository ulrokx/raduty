import axios from "axios";
import React from "react";
import { ReactEmbeddedGoogleCalendar } from "react-embedded-google-calendar";
import { useQuery } from "react-query";
interface ScheduleProps {}

export const Schedule: React.FC<ScheduleProps> = ({}) => {
  const {data, isLoading, isError, error} = useQuery("cal-url", ({ signal }) => {
    return axios.get("http://localhost:6969/api/v1/calendar/get", {
      signal,
    });
  });
  if(isLoading) {
    return <div>loading...</div>
  }
  if(isError) {
    return <div>error: {error}</div>
  }
  return (
    <div className="p-8">
      <ReactEmbeddedGoogleCalendar
        height="700px"
        publicUrl={`https://calendar.google.com/calendar/embed?src=${data?.data.Schedule.Calendar}&ctz=America%2FNew_York`}
      />
    </div>
  );
};
