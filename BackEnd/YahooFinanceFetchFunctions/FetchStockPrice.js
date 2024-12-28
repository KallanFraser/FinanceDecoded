/** @format */

import yahooFinance from "yahoo-finance2";

//Function to fetch chart data from yahoo finance
const fetchChartData = async (ticker, queryOptions) => {
	try {
		const result = await yahooFinance.chart(ticker, queryOptions);
		return result;
	} catch (error) {
		console.error(`FetchStockPrice.js`, error);
	}
};

export default fetchChartData;
