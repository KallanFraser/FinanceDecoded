/** @format */

//Axios = Better error handling fetch library
import axios from "axios";

const fetchQuote = async (ticker, setStockQuote) => {
	try {
		let serverResponse = await axios.post(`http://localhost:3000/getStockQuote`, {
			ticker: ticker,
		});
		//console.log("Stock Quote ", serverResponse.data);
		setStockQuote(serverResponse.data);
	} catch (error) {
		console.error("Error fetching stock data one day", error);
	}
};

export default fetchQuote;
