import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, useLocation, HashRouter } from "react-router-dom";
import { pageRoutes } from "../router.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <Routes>
      {pageRoutes.map((r) => (
        <Route path={r.path} key={r.path} element={<r.component />}></Route>
      ))}
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename={"/"}>
      <App />
    </HashRouter>
  </React.StrictMode>
);
