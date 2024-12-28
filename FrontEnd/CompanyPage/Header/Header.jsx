/** @format */

import React from "react";

import "./Header.css";

export const CompanyHeader = ({ stockQuote }) => {
	//Extract some stuff
	console.log("Quote: ", stockQuote);
	return (
		<div id="company-header">
			<div id="header-line-one">
				<h1>
					{stockQuote.longName} ({stockQuote.symbol})
				</h1>
				<button className="header-button">Watch List</button>
				<button className="header-button">Compare</button>
			</div>
			<div id="header-line-two">
				<h1>{stockQuote.bid}</h1>
				<h2>{stockQuote.regularMarketChange}</h2>
			</div>
		</div>
	);
};
