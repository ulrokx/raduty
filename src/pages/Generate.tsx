import axios from "axios";
import { Form, Formik } from "formik";
import React, { Suspense } from "react";
import { useMutation, useQuery } from "react-query";
import { GridLoader } from "react-spinners";
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import "react-datetime/css/react-datetime.css";
import { GenerateSideInfo } from "../components/GenerateSideInfo";
import { DateTimeInput } from "../components/DateTimeInput";
import { generateSchema } from "../util/yupSchemas";
import { Loader } from "../components/Loader";

interface GenerateProps {}

export const Generate: React.FC<GenerateProps> = ({}) => {
  const {
    data: groups,
    isError,
    error,
    isLoading,
  } = useQuery("groups", (signal) => {
    return axios.get("http://localhost:6969/api/v1/groups/get");
  });
  const mutation = useMutation('generateSchedule', (values) => {
    return axios.post("http://localhost:6969/api/v1/schedule/generate", values)
  })
  if (isError) {
    return <div>error: {error}</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex flex-row shadow-md bg-white mt-2 p-4">
      <Suspense fallback={<Loader />}>
        <Formik
          validationSchema={generateSchema}
          initialValues={{
            name: "",
            groups: [],
            begin: new Date(),
            end: new Date(),
            perShift: 2
          }}
          onSubmit={(v) => {
            mutation.mutate(v as any, {onError: (e) => console.log(e)})
          }}>
          {({ touched, errors }) => (
            <Form>
              <InputField label="Schedule Name" name="name" />
              <p className="text-lg mt-2">
                Groups to Include in Generated Schedule:
              </p>
              {groups?.data.map((g: any, i: number) => {
                return (
                  <InputField
                    key={g.ID}
                    type="checkbox"
                    value={g.ID.toString()}
                    label={g.Name}
                    name="groups"
                  />
                );
              })}
              <p className="text-red-500">
                {touched.groups && errors.groups
                  ? errors.groups
                  : null}
              </p>
              <InputField label="RA's Per Shift:" name="perShift" type="number" />
              <DateTimeInput name="begin" label="Begin Date" />
              <DateTimeInput name="end" label="End Date" />
              <SubmitButton>Create</SubmitButton>
            </Form>
          )}
        </Formik>
      </Suspense>
      <GenerateSideInfo />
    </div>
  );
};
