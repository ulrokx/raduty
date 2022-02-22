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
                        props.type == "checkbox" && ["Friday", "Saturday"].includes(props.label)
                            ? "form-checkbox h-5 w-5 text-blue-500 focus:border-blue-500 hover:border-blue-500 border-blue-300 rounded-sm"
                            : props.type == "checkbox"
                            ? "form-checkbox h-5 w-5 text-red-500 focus:border-red-500 hover:border-red-500 border-red-300 rounded-sm"
                            : "border-red-300 p-1 focus:scale-105 focus:border-red-500 transition-all rounded-md"
                    } border-2 outline-none`}
                />
                {props.type == "checkbox" ? props.label : null}
            </label>
            {meta.touched && meta.error && props.type != "checkbox" ? (
                <div className="text-red-500">{meta.error}</div>
            ) : null}
        </>
    );
};
