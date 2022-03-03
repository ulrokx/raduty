import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

interface ConfigProps {}

const tabs = ["Generate", "Assistants", "Groups"] as const;
type Tabs = typeof tabs[number];

export const Config: React.FC<ConfigProps> = ({}) => {
  const location = useLocation();
  const [selected, setSelected] = useState<Tabs>(() =>
    location.pathname.includes("enerate")
      ? "Generate"
      : location.pathname.includes("oup")
      ? "Groups"
      :"Assistants"
  );
  return (
    <div className="w-[75%] mx-auto pt-10">
      <ul className="flex flex-row gap-2">
        {tabs.map((t, i) => {
          return (
            <Link
              to={t.toLowerCase()}
              onClick={() => setSelected(t)}
              className={`px-3 py-2 rounded-t-lg cursor-pointer ${
                t === selected
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-red-200 hover:bg-red-300"
              }`}
              key={i}>
              {t}
            </Link>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
};
