/** @format */

import fetchQuote from "../YahooFinanceFetchFunctions/FetchQuote.js";

export const GetQuote = async (request, response) => {
	try {
		//Extracting ticker form request body
		const { ticker } = request.body;

		//Calling Fetch function and returning result
		const result = await fetchQuote(ticker);
		response.json(result);
	} catch (error) {
		console.error("GetStockPriceFiveDay.js: ", error);
		response.status(500).send("Server Error");
	}
};
