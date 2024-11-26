import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
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
import Result from "./pages/Result";
import GameModes from "./pages/GameModes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/game-modes" element={<GameModes />} />
      <Route path="/match" element={<Matchmaking />} />
      <Route path="/match/:matchId" element={<Match />} />
      <Route path="/result" element={<Result />} />
    </Route>
  )
);

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(<RouterProvider router={router} />);
} else {
  throw new Error("Could not find root element");
}
