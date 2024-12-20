/** @format */

import React, { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./main.css";

import LandingPage from "./LandingPage/LandingPage";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
			</Routes>
		</Router>
	</StrictMode>
);
