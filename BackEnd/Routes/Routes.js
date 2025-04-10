/** @format */
//Imported Libraries
import express from "express";

//Imported controller functions (.js extension specification is imperative)
import { getCompanySuggestions } from "../ControllerFunctions/GetCompanySuggestions.js";
import { getCompanyTicker } from "../ControllerFunctions/GetTicker.js";
import { getCompanyCIK } from "../ControllerFunctions/GetCIK.js";
import { GetQuote } from "../ControllerFunctions/GetQuote.js";

//Creation and reference to express' router object
const expressRouter = express.Router();

//All Routes (in expected use order)
expressRouter.post("/getCompanySuggestions", getCompanySuggestions);

expressRouter.post("/getCompanyCIK", getCompanyCIK);

expressRouter.post("/getCompanyTicker", getCompanyTicker);

expressRouter.post("/getStockQuote", GetQuote);

export default expressRouter;
