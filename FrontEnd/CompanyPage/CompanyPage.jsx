/** @format */

//Libraries imported
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components imported
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { CompanyHeader } from "./Header/Header";
import { StockGraphOneDay } from "./StockGraph/Graph/StockGraph";

//Fetch Functions imported
import fetchTicker from "../FetchFunctions/FetchTicker";
import fetchStockDataOneDay from "../FetchFunctions/FetchStockDataOneDay";
import fetchQuote from "../FetchFunctions/FetchQuote";

//CSS imported
import "./CompanyPage.css";

export const CompanyPage = () => {
	const { companyCIK } = useParams();

	const [ticker, setTicker] = useState("");
	const [stockQuote, setStockQuote] = useState(null);
	const [stockValues, setStockValues] = useState(null);

	useEffect(() => {
		if (companyCIK) {
			console.log("Attempting to fetch company ticker: ", companyCIK);
			fetchTicker(companyCIK, setTicker);
		}
	}, [companyCIK]);

	useEffect(() => {
		if (ticker) {
			fetchQuote(ticker[0], setStockQuote);
			fetchStockDataOneDay(ticker[0], setStockValues);
		}
	}, [ticker]);

	return (
		<div id="company-page">
			<NavigationBar />
			{stockQuote != null && <CompanyHeader stockQuote={stockQuote} />}
			<div id="graph-section"></div>
			{ticker != "" && <StockGraphOneDay ticker={ticker[0]} />}
		</div>
	);
};

/*
Ask
Bid
Analyst Rating
Book Value
Dividend Yield
Earnings Time Stamp Start
EPS current year
EPS forward
EPS trailing twelve months
Fifty Day Average
Fifty Day Average Change
fiftyTwoWeekChangePercent
fiftyTwoWeekHigh
fiftyTwoWeekHighChange
fiftyTwoWeekHighChangePercent
fiftyTwoWeekLow
fiftyTwoWeekLowChange
fiftyTwoWeekLowChangePercent
fiftyTwoWeekRange {low: 164.08, high: 260.1}
Forward PE
Long Name
Market Cap
Market State (is market open)
Price EPS current Year
Price to Book
regularMarketChange
regularMarketChangePercent
regularMarketDayHigh
regularMarketDayLow
regularMarketDayRange {low: 253.06, high: 258.7}
regularMarketOpen
regularMarketPreviousClose
regularMarketPrice
regularMarketTime
regularMarketVolume
sharesOutstanding
Trailing PE
twoHundredDayAverage
twoHundredDayAverageChange
twoHundredDayAverageChangePercent
*/
