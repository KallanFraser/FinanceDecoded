/** @format */

import { pool } from "../Database/Database.js";

export const getCompanyCIK = async (request, response) => {
	const { companyName } = request.body;

	try {
		//Bad Request Error Handling
		if (!companyName) {
			return response.status(400).json({ message: "GetCIK: No Company Name provided" });
		}

		//Fetching the company's CIK from the database
		const CIKQuery = `SELECT cik, company_name FROM company_facts_data WHERE company_name = $1;`;
		const companyNameQuery = [companyName];
		const databaseResult = await pool.query(CIKQuery, companyNameQuery);

		//No CIK returned response handling
		if (databaseResult.rows.length === 0) {
			return response.status(404).json({ message: "GetCIK: No CIK found" });
		}

		//Fetch is successful, returning the data (string)
		const companyCIK = databaseResult.rows[0].cik;
		response.json(companyCIK);
	} catch (error) {
		console.error("GetCIK.js: Error fetching CIK", error);
		response.status(500).send("Server Error");
	}
};
