/** @format */

import fetchChartData from "../../YahooFinanceFetchFunctions/FetchStockPrice.js";

export const GetStockPriceFiveYear = async (request, response) => {
	try {
		//Extracting ticker form request body
		const { ticker } = request.body;

		//Getting dates
		const now = new Date();
		const fiveYearsAgo = shiftDate(new Date(), { years: -5 });

		//Setting Query Options
		const queryOptions = {
			period1: toTimestamp(fiveYearsAgo),
			period2: toTimestamp(now),
			interval: "1wk",
			return: "object",
		};

		//Calling Fetch function and returning result
		const result = await fetchChartData(ticker, queryOptions);
		response.json(result);
	} catch (error) {
		console.error("GetStockPriceFiveYear.js: ", error);
		response.status(500).send("Server Error");
	}
};

//Function to convert a date object to unix units (time in seconds)
const toTimestamp = (date) => Math.floor(date.getTime() / 1000);

//Shifts a date by the specified period (years/months/days)
const shiftDate = (baseDate, { years = 0, months = 0, days = 0 }) => {
	return new Date(baseDate.getFullYear() + years, baseDate.getMonth() + months, baseDate.getDate() + days);
};
