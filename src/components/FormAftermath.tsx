import axios, { AxiosResponse } from "axios";
import React from "react";
import { UseMutationResult } from "react-query";

interface FormAftermathProps {
  postMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
}

export const FormAftermath: React.FC<FormAftermathProps> = ({
  postMutation,
}) => {
  let message;
  const { error, status, data } = postMutation;
  if (status === "error") {
    if (axios.isAxiosError(error)) {
      switch (error.response?.data.error) {
        case "forbidden":
          message =
            "You have already submitted your availability.";
          break;
        case "unlisted":
          message =
            "You were not identified as an RA by your CWID, please try again.";
      }
    }
  } else if (status === "success") {
    switch (data?.data.message) {
      case "registered":
        message = "Thank you for submitting your availability!";
        break;
      case "reregistered":
        message =
          "Thank you for re-submitting your availability!";
        break;
      default:
        message = "Thank you!";
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2
        className={`text-6xl font-semibold ${
          status === "success"
            ? "text-green-500"
            : "text-red-500"
        }`}>
        {status === "success" ? "Success!" : "Error"}
      </h2>
      <div className="mt-10 text-2xl font-semibold">
        {message}
      </div>
    </div>
  );
};
