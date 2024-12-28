/** @format */

import fetchChartData from "../../YahooFinanceFetchFunctions/FetchStockPrice.js";

export const getStockPriceFiveDay = async (request, response) => {
	try {
		//Extracting ticker form request body
		const { ticker } = request.body;

		//Getting dates
		const now = new Date();
		const fiveDaysAgo = shiftDate(now, { days: -5 });

		//Setting Query Options
		const queryOptions = {
			period1: toTimestamp(fiveDaysAgo),
			period2: toTimestamp(now),
			interval: "15m",
			return: "object",
		};

		//Calling Fetch function and returning result
		const result = await fetchChartData(ticker, queryOptions);
		response.json(result);
	} catch (error) {
		console.error("GetStockPriceFiveDay.js: ", error);
		response.status(500).send("Server Error");
	}
};

//Function to convert a date object to unix units (time in seconds)
const toTimestamp = (date) => Math.floor(date.getTime() / 1000);

//Shifts a date by the specified period (years/months/days)
const shiftDate = (baseDate, { years = 0, months = 0, days = 0 }) => {
	return new Date(baseDate.getFullYear() + years, baseDate.getMonth() + months, baseDate.getDate() + days);
};
