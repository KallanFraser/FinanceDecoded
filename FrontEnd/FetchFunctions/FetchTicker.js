/** @format */

//Axios = Better error handling fetch library
import axios from "axios";

const fetchTicker = async (companyCIK, setTicker) => {
	try {
		let serverResponse = await axios.post(`http://localhost:3000/getCompanyTicker`, {
			companyCIK: companyCIK,
		});
		setTicker(serverResponse.data);
		console.log("Company ticker fetched: ", serverResponse.data);
	} catch (error) {
		console.error("Error fetching companys Ticker", error);
	}
};

export default fetchTicker;
