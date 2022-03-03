import axios from "axios";
import { Form, Formik } from "formik";
import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { GridLoader } from "react-spinners";
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { loaderCSS } from "./Create";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

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
  if (isError) {
    return <div>error: {error}</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }
  const ids = [...groups?.data.map((g: any) => g.ID)];
  return (
    <div>
      <Suspense
        fallback={
          <GridLoader
            css={loaderCSS}
            size={50}
            color="#ef4444"
          />
        }>
        <Formik
          initialValues={{
            name: "",
            groups: [],
            begin: new Date(),
            end: new Date(),
          }}
          onSubmit={(v) => {
            console.log(v);
          }}>
          {({ initialValues, values, setFieldValue }) => (
            <Form>
              <InputField label="Schedule Name" name="name" />
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
              <DateTime
                timeFormat={false}
                value={values.begin}
                onChange={(v) => setFieldValue("begin", v)}
                strictParsing
              />
              <DateTime
                timeFormat={false}
                value={values.end}
                onChange={(v) => setFieldValue("end", v)}
                strictParsing
              />
              <SubmitButton>Create</SubmitButton>
            </Form>
          )}
        </Formik>
      </Suspense>
    </div>
  );
};
