import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
interface ScheduleProps {}

export const Schedule: React.FC<ScheduleProps> = ({}) => {
  return (
    <div className="m-8 border-2 border-black">
      <Calendar
        height="80vh"
        isReadOnly={true}
        view="month"
        onchange
        usageStatistics={false}
      />
    </div>
  );
};
