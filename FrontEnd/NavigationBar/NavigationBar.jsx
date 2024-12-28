/** @format */

import React from "react";
import { Link } from "react-router-dom";

import "./NavigationBar.css";

export const NavigationBar = () => {
	return (
		<div id="navigation-bar">
			<Link to="/">
				<img src="../Logos/FinanceDecoded.png"></img>
			</Link>
			<div id="text-links">
				<a className="links-text">Watchboard</a>
				<a className="links-text">Search</a>
				<a className="links-text">Markets</a>
			</div>
			<a>
				<img src="../Logos/UserIcon.png"></img>
			</a>
		</div>
	);
};
