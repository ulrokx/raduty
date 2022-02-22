import { Field, Form, Formik } from "formik";
import React from "react";
import { CreateSideInfo } from "../components/CreateSideInfo";
import { DateInput } from "../components/DateInput";
import { InputField } from "../components/InputField";
import * as Yup from "yup";
import dayjs from "dayjs";

const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

const weekDays = daysOfWeek.slice(0, 5);

const Schema = Yup.object().shape({
    first: Yup.string()
        .min(2, "Too short!")
        .max(16, "Too long!")
        .required("Required!"),
    last: Yup.string()
        .min(2, "Too short!")
        .max(16, "Too long!")
        .required("Required!"),
    cwid: Yup.string()
        .matches(/[0-9]{8}/, "Invalid ID!")
        .required("Required!"),
    email: Yup.string()
        .required("Required!")
        .email("Invalid mail!")
        .matches(/stevens.edu/gi, "Use your school email!"),
    days: Yup.array()
        .test(
            "weekend",
            "Select at least one weekend day!",
            (a) => {
                if (a) {
                    return (
                        a.includes(daysOfWeek[5]) ||
                        a.includes(daysOfWeek[6])
                    );
                }
                return false;
            }
        )
        .test("weekdays", "Select at least 3 weekdays!", (a) => {
            if (a) {
                let count = 0;
                a.forEach((d) => {
                    if (weekDays.includes(d)) count++;
                });
                if(count >= 3) return true
            }
            return false;
        }),
    dates: Yup.array().test("dates", "Invalid dates!", (a) => {
        if (a) {
            let isGood = true;
            a.forEach((d) => {
                if (!dayjs(d, "M/D/YYYY", true).isValid()) {
                    isGood = false;
                }
            });
            return isGood;
        }
        return true;
    }),
});

interface CreateProps {}

interface IFormValues {
    last: string;
    first: string;
    cwid: string;
    email: string;
    days: string[];
    dates: string[];
}

export const Create: React.FC<CreateProps> = ({}) => {
    return (
        <div className="flex w-[75%] mx-auto flex-col items-center">
            <h1 className="text-5xl font-medium my-8">
                Submit Your Availability
            </h1>
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
                        }}
                        validationSchema={Schema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}>
                        {({
                            setFieldValue,
                            errors,
                            touched,
                        }) => {
                            console.log(errors);
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
                                            <div className="text-red-500">
                                                {touched.days &&
                                                    errors.days &&
                                                    errors.days}
                                            </div>
                                            {daysOfWeek.map(
                                                (v, i) => {
                                                    return (
                                                        <InputField
                                                            key={
                                                                i
                                                            }
                                                            label={`${v[0].toUpperCase()}${v.substring(
                                                                1
                                                            )}`}
                                                            type="checkbox"
                                                            name="days"
                                                            value={
                                                                v
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="basis-1/2">
                                            <DateInput
                                                onTagChange={
                                                    setFieldValue
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-4 hover:scale-105 transition-all border-2 rounded-md bg-red-500 text-2xl text-white p-3">
                                        Submit
                                    </button>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
                <div className="basis-2/5">
                    <CreateSideInfo />
                </div>
            </div>
        </div>
    );
};
