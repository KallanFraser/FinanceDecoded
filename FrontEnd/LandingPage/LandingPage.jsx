/** @format */
import React from "react";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { SearchBar } from "./SearchBar/SearchBar";

import "./LandingPage.css";

const LandingPage = () => {
	return (
		<div id="landing-page">
			<NavigationBar />
			<SearchBar />
		</div>
	);
};

export default LandingPage;
