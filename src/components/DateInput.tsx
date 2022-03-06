import ReactTagInput from "@pathofdev/react-tag-input";
import { useState } from "react";
import { BEGIN_DATE, END_DATE } from "../constants/dates";
import moment from "moment";

interface MoreProps {
  onTagChange: (field: string, value: any) => void;
}

export const DateInput = (props: MoreProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col items-center w-full">
      <label className="text-lg w-full">
        Requested Days Off
        <ReactTagInput
          validator={(value) => {
            const date = moment(value, "M/D/YYYY", true)
            if (!date.isValid()) {
              setError("Use the format mm/dd/yyyy");
              return false;
            } else if (tags.includes(value.trim())) {
              setError("Date already entered");
              return false;
            } else if (
              date.isBefore(BEGIN_DATE) ||
              date.isAfter(END_DATE)
            ) {
              setError("Date not in range");
              return false;
            } else {
              setError("");
              return true;
            }
          }}
          tags={tags}
          placeholder="mm/dd/yyyy"
          onChange={(n) => {
            setTags(n);
            props.onTagChange("dates", n);
          }}
        />
        <p className="text-red-500 text-base">{error}</p>
      </label>
    </div>
  );
};
