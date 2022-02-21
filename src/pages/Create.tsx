import { Field, Form, Formik } from "formik";
import React from "react";
import { CreateSideInfo } from "../components/CreateSideInfo";
import { DateInput } from "../components/DateInput";
import { InputField } from "../components/InputField";

const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

interface CreateProps {}

export const Create: React.FC<CreateProps> = ({}) => {
    return (
        <div className="flex w-[75%] mx-auto flex-col items-center">
            <h1 className="text-5xl font-medium my-8">
                Submit your availablity
            </h1>
            <div className="flex flex-row justify-center gap-x-8 w-full">
                <Formik
                    initialValues={{
                        last: "",
                        first: "",
                        cwid: "",
                        days: [],
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}>
                    {({ values,setFieldValue }) => {
                        return (
                            <Form className="flex flex-row gap-x-8">
                                <div className="flex flex-col">
                                    <InputField
                                        label="First Name"
                                        name="first"
                                        placeholder="Nariman"
                                    />
                                    <InputField
                                        label="Last Name"
                                        name="last"
                                        placeholder="Farvardin"
                                    />
                                    <InputField
                                        label="Campus Wide ID"
                                        name="cwid"
                                        placeholder="12345678"
                                    />
                                    {daysOfWeek.map((v, i) => {
                                        return (
                                            <label key={i}>
                                                <InputField
                                                    label={`${v[0].toUpperCase()}${v.substring(
                                                        1
                                                    )}`}
                                                    type="checkbox"
                                                    name="days"
                                                    value={v}
                                                />
                                            </label>
                                        );
                                    })}
                                <button type="submit" className="mt-4 hover:scale-105 transition-all border-2 rounded-md bg-red-500 text-2xl text-white p-3">
                                    Submit
                                </button>
                                </div>
                                <DateInput onTagChange = {setFieldValue}/>
                            </Form>
                        );
                    }}
                </Formik>
                <CreateSideInfo />
            </div>
        </div>
    );
};
