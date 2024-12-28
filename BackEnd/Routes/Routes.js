/** @format */
//Imported Libraries
import express from "express";

//Imported controller functions (.js extension specification is imperative)
import { getCompanySuggestions } from "../ControllerFunctions/GetCompanySuggestions.js";
import { getCompanyTicker } from "../ControllerFunctions/GetTicker.js";
import { getCompanyCIK } from "../ControllerFunctions/GetCIK.js";
import { GetQuote } from "../ControllerFunctions/GetQuote.js";

import { getStockPriceOneDay } from "../ControllerFunctions/StockPrices/GetStockPriceOneDay.js";
import { getStockPriceFiveDay } from "../ControllerFunctions/StockPrices/GetStockPriceFiveDay.js";
import { getStockPriceOneMonth } from "../ControllerFunctions/StockPrices/GetStockPriceOneMonth.js";
import { getStockPriceSixMonth } from "../ControllerFunctions/StockPrices/GetStockPriceSixMonth.js";
import { getStockPriceOneYear } from "../ControllerFunctions/StockPrices/GetStockPriceOneYear.js";
import { getStockPriceYTD } from "../ControllerFunctions/StockPrices/GetStockPriceYTD.js";
import { GetStockPriceFiveYear } from "../ControllerFunctions/StockPrices/GetStockPriceFiveYear.js";

//Creation and reference to express' router object
const expressRouter = express.Router();

//All Routes (in expected use order)
expressRouter.post("/getCompanySuggestions", getCompanySuggestions);

expressRouter.post("/getCompanyCIK", getCompanyCIK);

expressRouter.post("/getCompanyTicker", getCompanyTicker);

expressRouter.post("/getStockQuote", GetQuote);

expressRouter.post("/getStockPriceOneDay", getStockPriceOneDay);

export default expressRouter;
