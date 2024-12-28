/** @format */

import fetchChartData from "../../YahooFinanceFetchFunctions/FetchStockPrice.js";

export const getStockPriceOneYear = async (request, response) => {
	try {
		//Extracting ticker form request body
		const { ticker } = request.body;

		//Getting dates
		const now = new Date();
		const oneYearAgo = shiftDate(new Date(), { years: -1 });

		//Setting Query Options
		const queryOptions = {
			period1: formatDate(oneYearAgo),
			period2: formatDate(now),
			interval: "1d",
			return: "object",
		};

		//Calling Fetch function and returning result
		const result = await fetchChartData(ticker, queryOptions);
		response.json(result);
	} catch (error) {
		console.error("GetStockPriceOneYear.js: ", error);
		response.status(500).send("Server Error");
	}
};

//Formats a date string as such: YYYY-MM-DD
const formatDate = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

//Shifts a date by the specified period (years/months/days)
const shiftDate = (baseDate, { years = 0, months = 0, days = 0 }) => {
	return new Date(baseDate.getFullYear() + years, baseDate.getMonth() + months, baseDate.getDate() + days);
};
