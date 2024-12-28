/** @format */

import fetchChartData from "../../YahooFinanceFetchFunctions/FetchStockPrice.js";

export const getStockPriceOneDay = async (request, response) => {
	try {
		//Extracting ticker form request body
		const { ticker } = request.body;

		//Getting dates
		const now = new Date();
		const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		//Setting Query Options
		const queryOptions = {
			period1: toTimestamp(startOfDay),
			period2: toTimestamp(now),
			interval: "5m",
			return: "object",
		};

		//Calling Fetch function and returning result
		const result = await fetchChartData(ticker, queryOptions);
		response.json(result);
	} catch (error) {
		console.error("GetStockPriceOneDay.js: ", error);
		response.status(500).send("Server Error");
	}
};

//Function to convert a date object to unix units (time in seconds)
const toTimestamp = (date) => Math.floor(date.getTime() / 1000);
