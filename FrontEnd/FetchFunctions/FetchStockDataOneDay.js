/** @format */

//Axios = Better error handling fetch library
import axios from "axios";

const fetchStockDataOneDay = async (ticker, setStockValues) => {
	try {
		let serverResponse = await axios.post(`http://localhost:3000/getStockPriceOneDay`, {
			ticker: ticker,
		});
		console.log("Stock Data One Day ", serverResponse.data);
		setStockValues(serverResponse.data);
	} catch (error) {
		console.error("Error fetching stock data one day", error);
	}
};

export default fetchStockDataOneDay;
