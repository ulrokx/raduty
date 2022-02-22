import { Field, Form, Formik } from "formik";
import React from "react";
import { CreateSideInfo } from "../components/CreateSideInfo";
import { DateInput } from "../components/DateInput";
import { InputField } from "../components/InputField";
import { useMutation, useQuery } from "react-query";
import { Schema } from "../util/availabilitySchema";
import { daysOfWeek } from "../util/daysOfWeek";
import axios from "axios";
import { AvailabilityForm } from "../components/AvailabilityForm";
import {
  GridLoader,
  HashLoader,
  PropagateLoader,
} from "react-spinners";
import { css } from "@emotion/react";
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

const loaderCSS = css`
  margin-top: 3rem;
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
