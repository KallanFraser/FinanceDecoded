/** @format */
import { pool } from "../Database/Database.js";

export const getCompanyTicker = async (request, response) => {
	const { companyCIK } = request.body;
	try {
		//Bad Request Error Handling
		if (!companyCIK) {
			return response.status(400).json({ message: "GetTicker: No CIK provided" });
		}

		//Fetching the ticker from the database
		const tickerQuery = `SELECT tickers, company_name FROM company_submissions_data WHERE cik = $1;`;
		const companyCIKQuery = [companyCIK];
		const databaseResult = await pool.query(tickerQuery, companyCIKQuery);

		//No Ticker returned response handling
		if (databaseResult.rows.length === 0) {
			return response.status(404).json({ message: "GetTicker: No Company Ticker Found" });
		}

		//Fetch is successful, returning the data (array of strings)
		const companyTicker = databaseResult.rows[0].tickers;
		response.json(companyTicker);
	} catch (error) {
		console.error("GetTicker.js: Error fetching Ticker", error);
		response.status(500).send("Server error");
	}
};
