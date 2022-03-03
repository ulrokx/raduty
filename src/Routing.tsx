import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Create } from "./pages/Create";
import { Config } from "./pages/Config";
import { Schedule } from "./pages/Schedule";
import { Generate } from "./pages/Generate";
import { Assistants } from "./pages/Assistants";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate to="schedule" />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="create" element={<Create />} />
        <Route path="config" element={<Config />}>
          <Route index element={<Navigate to="assistants" />} />
          <Route path="generate" element={<Generate />} />
          <Route path="assistants" element={<Assistants />} />
          <Route path="groups" />
        </Route>
      </Routes>
    </>
  );
};
