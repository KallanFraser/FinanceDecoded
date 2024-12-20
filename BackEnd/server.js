/** @format */

//Node Library Imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

//Local static file imports
import { pool } from "./Database/Database.js";
import routes from "./Routes/Routes.js";

//File system variables
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

//Express App Setup
const app = express();
app.use(express.json());
app.use(routes);
const PORT = 3000;

//Database connection test
pool.query("SELECT NOW()", (error, response) => {
	if (error) {
		console.error("Error occured whilst connecting to the database", error);
	} else {
		console.log("Connected to the Database");
	}
});

//Server start point
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
