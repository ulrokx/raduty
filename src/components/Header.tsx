import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <header className="sticky top-0 h-16 bg-red-500 text-2xl font-medium text-white">
            <ul className="flex flex-row items-center h-full p-4 gap-4">
                <li className="hover:scale-105 transition-all">
                    <Link to="/schedule">Schedule</Link>
                </li>
                <li className="hover:scale-105 transition-all">
                    <Link to="/create">Create</Link>
                </li>
                <li className="hover:scale-105 transition-all ml-auto">
                    <Link to="/config">Config</Link>
                </li>
            </ul>
        </header>
    );
};
