/** @format */

import React from "react";

import "./Header.css";

function formatValue(value) {
	const cappedValue = Math.floor(value * 100) / 100;
	const formattedValue = cappedValue >= 0 ? `+${cappedValue}` : cappedValue;
	return formattedValue;
}

function getClassName(value) {
	return value >= 0 ? "market-price-positive" : "market-price-negative";
}

export const CompanyHeader = ({ stockQuote }) => {
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
				<div id="regular-market-section">
					<h1>{stockQuote.regularMarketPrice}</h1>
					<h2 className={getClassName(stockQuote.regularMarketChange)}>
						{formatValue(stockQuote.regularMarketChange)}
					</h2>
					<h2 className={getClassName(stockQuote.regularMarketChangePercent)}>
						({formatValue(stockQuote.regularMarketChangePercent)})%
					</h2>
				</div>
				{stockQuote.tradeable && (
					<div id="after-market-section">
						<h1>{stockQuote.postMarketPrice}</h1>
						<h2 className={getClassName(stockQuote.postMarketChange)}>
							{formatValue(stockQuote.postMarketChange)}
						</h2>
						<h2 className={getClassName(stockQuote.postMarketChangePercent)}>
							({formatValue(stockQuote.postMarketChangePercent)})%
						</h2>
						<h3>(Post Trading Hours)</h3>
					</div>
				)}
			</div>
		</div>
	);
};
