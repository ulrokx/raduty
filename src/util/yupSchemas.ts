import * as Yup from "yup";
import { daysOfWeek, weekDays } from "./daysOfWeek";
import moment, { MomentInput } from "moment";
export const generateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(16, "Too long!")
    .required("Required!"),
  groups: Yup.array().test("valid", "Select a group!", (a) => {
    return (a && a.length >= 1) || false;
  }),
  end: Yup.date()
    .required("Required!")
    .test({
      name: "after",
      message: "Date must be after begin date!",
      test: function (value) {
        console.log(value, this.parent);
        if (this.parent.begin && value) {
          return (
            moment(value).diff(
              moment(this.parent.begin),
              "days"
            ) >= 2
          );
        }
        return false;
      },
    }),
  perShift: Yup.number()
    .required("Required!")
    .integer("Must be a number")
    .max(4, "Too high!")
    .min(1, "Too low!"),
});

export const availabilitySchema = Yup.object().shape({
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
  // .test(
  //     "alreadyreg",
  //     "You have already registered!",
  //     async (v) => {
  //         let good = false;
  //         if (v?.length == 8) {
  //             const res = await axios.get(
  //                 "http://localhost:8080/api/v1/availability/already",
  //                 {
  //                     data: {
  //                         cwid: v,
  //                     },

  //                 }
  //             );
  //             console.log(res)
  //         }
  //         return good;
  //     }
  // ),
  email: Yup.string()
    .required("Required!")
    .email("Invalid mail!")
    .matches(/stevens.edu/gi, "Use your school email!"),
  days: Yup.array()
    .test("weekend", "Select at least one weekend day!", (a) => {
      if (a) {
        return (
          a.includes(daysOfWeek[5]) || a.includes(daysOfWeek[6])
        );
      }
      return false;
    })
    .test("weekdays", "Select at least 3 weekdays!", (a) => {
      if (a) {
        let count = 0;
        a.forEach((d) => {
          if (weekDays.includes(d)) count++;
        });
        if (count >= 3) return true;
      }
      return false;
    }),
  dates: Yup.array().test("dates", "Invalid dates!", (a) => {
    if (a) {
      let isGood = true;
      a.forEach((d) => {
        if (!moment(d, "M/D/YYYY", true).isValid()) {
          isGood = false;
        }
      });
      return isGood;
    }
    return true;
  }),
});
