import React from "react";
import { createRoot } from "react-dom/client";
import "@repo/ui/main.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Matchmaking from "./pages/Matchmaking";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/match" element={<Matchmaking />} />
      <Route path="/match/:matchId" element={<Match />} />
    </Route>,
  ),
);

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(<RouterProvider router={router} />);
} else {
  throw new Error("Could not find root element");
}
