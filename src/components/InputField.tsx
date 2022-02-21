import { FieldHookConfig, useField } from "formik";
import { HTMLAttributes } from "react";

interface OtherInputProps {
    label: string;
}

export const InputField = (
    props: OtherInputProps & FieldHookConfig<string>
) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <label
                className={`flex ${
                    props.type == "checkbox"
                        ? "flex-row items-center gap-3 mt-2"
                        : "flex-col"
                } text-lg mb-2`}>
                {props.type == "checkbox" ? null : props.label}
                <input
                    {...field}
                    type={props.type}
                    placeholder={props.placeholder}
                    className={`${
                        props.type == "checkbox" ? "form-checkbox h-3 w-3 text-red-500" : ""
                    } border-2 border-red-300 rounded-md p-1 outline-none focus:scale-105 focus:border-red-500 transition-all`}
                />
                {props.type == "checkbox" ? props.label : null}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};
