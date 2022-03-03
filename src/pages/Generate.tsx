import axios from "axios";
import { Form, Formik } from "formik";
import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { GridLoader } from "react-spinners";
import { InputField } from "../components/InputField";
import { loaderCSS } from "./Create";

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
          }}
          onSubmit={(v) => {
            console.log(v);
          }}>
          {({ initialValues }) => (
            <Form>
              <InputField label="Schedule Name" name="name" />
              {groups?.data.map((g: any, i: number) => {
                return (
                  <InputField
                    key={i}
                    type="checkbox"
                    value={g.ID}
                    label={g.Name}
                    name="groups"
                  />
                );
              })}
            </Form>
          )}
        </Formik>
      </Suspense>
    </div>
  );
};
