/** @format */

import yahooFinance from "yahoo-finance2";

const fetchQuote = async (ticker) => {
	try {
		const quote = await yahooFinance.quote(ticker);
		return quote;
	} catch (error) {
		console.error("FetchQuote.js: ", error);
	}
};

export default fetchQuote;
