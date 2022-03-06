import { AxiosResponse } from "axios";
import { Formik, Form } from "formik";
import React from "react";
import { UseMutationResult } from "react-query";
import { availabilitySchema } from "../util/yupSchemas";
import { daysOfWeek } from "../util/daysOfWeek";
import { CreateSideInfo } from "./CreateSideInfo";
import { DateInput } from "./DateInput";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";

interface AvailabilityFormProps {
  postMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
}

export const AvailabilityForm: React.FC<
  AvailabilityFormProps
> = ({ postMutation }) => {
  return (
    <div className="flex xl:flex-row justify-center gap-8 w-full flex-col-reverse">
      <div className="basis-3/5">
        <Formik
          initialValues={{
            last: "",
            first: "",
            cwid: "",
            email: "",
            days: [],
            dates: [],
            towers: false,
            group: 1,
          }}
          validationSchema={availabilitySchema}
          onSubmit={(values) => {
            console.log(values)
            values.group = values.towers ? 2 : 1;
            postMutation.mutate(values as any, {
              onSuccess: (d) => console.log(d),
            });
          }}>
          {({ setFieldValue, errors, touched }) => {
            return (
              <Form className="flex flex-col gap-x-8 flex-grow-0">
                <div className="flex md:flex-row flex-col justify-between">
                  <div className="flex flex-col basis-1/4 mr-4">
                    <InputField
                      label="First Name"
                      name="first"
                      placeholder="Nariman"
                      required={true}
                    />
                    <InputField
                      label="Last Name"
                      name="last"
                      placeholder="Farvardin"
                      required={true}
                    />
                    <InputField
                      label="Campus Wide ID"
                      name="cwid"
                      placeholder="12345678"
                      required={true}
                    />
                    <InputField
                      label="School Email"
                      name="email"
                      placeholder="nfarvard@stevens.edu"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col basis-1/4 mr-4">
                    {daysOfWeek.map((v, i) => {
                      return (
                        <InputField
                          key={i}
                          label={`${v[0].toUpperCase()}${v.substring(
                            1
                          )}`}
                          type="checkbox"
                          name="days"
                          value={v}
                        />
                      );
                    })}

                    <div className="text-base text-red-500">
                      {touched.days && errors.days}
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <DateInput onTagChange={setFieldValue} />
                    <InputField
                      label="Towers?"
                      name="towers"
                      type="checkbox"
                    />
                  </div>
                </div>
                    <SubmitButton>Submit</SubmitButton>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="basis-2/5">
        <CreateSideInfo />
      </div>
    </div>
  );
};
