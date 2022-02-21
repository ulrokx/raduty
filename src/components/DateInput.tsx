import ReactTagInput from "@pathofdev/react-tag-input";
import { useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

interface MoreProps {
    onTagChange: (field: string, value: any) => void;
}

export const DateInput = (props: MoreProps) => {
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState(true);
    return (
        <div className="flex flex-col items-center">
            <ReactTagInput
                validator={(value) => {
                    const isValid = dayjs(
                        value,
                        "MM/DD/YYYY"
                    ).isValid();
                    if (!isValid) {
                        setError(true);
                    } else {
                        setError(false);
                    }
                    return isValid;
                }}
                tags={tags}
                placeholder="mm/dd/yyyy"
                removeOnBackspace={true}
                onChange={(n) => {
                    setTags(n);
                    props.onTagChange("dates", n);
                }}
            />
            {error && (
                <p>Enter a date in the format mm/dd/yyyy</p>
            )}
        </div>
    );
};
