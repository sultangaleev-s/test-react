import React from "react";
import { routs } from "./routs";
import { Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      {routs.map((page) => (
        <Route path={page.path} element={<page.element />} key={page.path} />
      ))}
    </Routes>
  );
};
