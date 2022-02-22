import * as Yup from "yup";
import dayjs from "dayjs";
import { daysOfWeek, weekDays } from "./daysOfWeek";

export const Schema = Yup.object().shape({
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
                    if (weekDays.includes(d))
                        count++;
                });
                if (count >= 3)
                    return true;
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
