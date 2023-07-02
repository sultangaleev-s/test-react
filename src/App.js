import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "@router/AppRouter";
import { Loader } from "@components/Loader/Loader";
import "./App.scss";

const App = () => {
  return (
    <Suspense fallback={<Loader type="page" />}>
      <Router>
        <AppRouter />
      </Router>
    </Suspense>
  );
};

export default App;
