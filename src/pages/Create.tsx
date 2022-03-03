import { css } from "@emotion/react";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import {
  GridLoader
} from "react-spinners";
import { AvailabilityForm } from "../components/AvailabilityForm";
import { FormAftermath } from "../components/FormAftermath";

interface CreateProps {}

interface IFormValues {
  last: string;
  first: string;
  cwid: string;
  email: string;
  days: string[];
  dates: string[];
}

export const loaderCSS = css`
  margin-top: 8rem;
`;

export const Create: React.FC<CreateProps> = ({}) => {
  const postMutation = useMutation((formData) => {
    return axios.post(
      "http://localhost:6969/api/v1/availability",
      formData
    );
  });
  return (
    <div className="flex w-[75%] mx-auto flex-col items-center">
      {postMutation.isLoading ? (
        <GridLoader css={loaderCSS} size={50} color="#ef4444" />
      ) : postMutation.isSuccess || postMutation.isError ? (
        <FormAftermath postMutation={postMutation} />
      ) : (
        <>
          <h1 className="text-5xl font-medium my-8">
            Submit Your Availability
          </h1>
          <AvailabilityForm postMutation={postMutation} />
        </>
      )}
    </div>
  );
};
