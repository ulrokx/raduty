import {
  FieldConfig,
  FieldHelperProps,
  FieldHookConfig,
  FormikProps,
  useField,
} from "formik";
import moment from "moment";
import React, {
  ClassAttributes,
  TextareaHTMLAttributes,
} from "react";
import DateTime from "react-datetime";

interface DateTimeInputProps {
  label: string;
  name: string;
  props?: DateTimeInputProps;
}
const inputProps = {
  className:
    "border-red-300 p-1 focus:scale-105 focus:border-red-500 transition-all rounded-md border-2 outline-none",
  readOnly: true,
};

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  ...props
}) => {
  const [field, { error, touched }, helpers] = useField(props);
  return (
    <>
      <label>{label}</label>
      <DateTime
        value={field.value}
        onClose={(v) => {
          if (typeof v !== "string" && "toDate" in v) {
            helpers.setTouched(true);
            helpers.setValue(v.toDate());
          }
        }}
        timeFormat={false}
        strictParsing
        inputProps={inputProps}
        closeOnSelect
        closeOnClickOutside
      />
      <p className="text-red-500">
        {error && touched ? error : null}
      </p>
    </>
  );
};
