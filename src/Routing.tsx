import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Create } from "./pages/Create";
import { Generator } from "./pages/Generator";
import { Modify } from "./pages/Modify";
import { Schedule } from "./pages/Schedule";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
    return (
        <>
            <Header />
            <Routes>
                <Route
                    index
                    element={<Navigate to="/schedule" />}
                />
                <Route path="/schedule" element={<Schedule />} />
                <Route
                    path="/generator"
                    element={<Generator />}
                />
                <Route path="/modify" element={<Modify />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </>
    );
};
