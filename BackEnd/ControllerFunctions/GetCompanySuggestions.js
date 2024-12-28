/** @format */

import { pool } from "../Database/Database.js";

export const getCompanySuggestions = async (request, response) => {
	const { companyName } = request.body;
	try {
		//Bad Request Error Handling
		if (!companyName) {
			return response.status(400).json({ message: "GetCompanyName: No Company Name Provided" });
		}

		//Fetching the company name suggestions from the database
		const companyNameCaseInsensitive = [`${companyName}%`];
		const companySuggestionsQuery = `SELECT company_name, revenue_for_suggestions FROM company_facts_data WHERE company_name ILIKE $1
        ORDER BY revenue_for_suggestions DESC LIMIT 10;`;
		const databaseResult = await pool.query(companySuggestionsQuery, companyNameCaseInsensitive);

		//No suggestions returned response handling
		if (databaseResult.rows.length === 0) {
			return response.status(404).json({ message: "GetCompanyName: No Companys Found" });
		}

		//Fetch is successful, returning the data (array of strings)
		const returnedCompanySuggestions = databaseResult.rows.map((row) => row.company_name);
		response.json(returnedCompanySuggestions);
	} catch (error) {
		console.error("GetCompanySuggestions.js: Error fetching Suggestions", error);
		response.status(500).send("Server Error");
	}
};
