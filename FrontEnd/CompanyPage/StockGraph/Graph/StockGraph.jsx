/** @format */

//Fetch Functions
import fetchStockDataOneDay from "../../../FetchFunctions/FetchStockDataOneDay";

//CSS Import
import "./StockGraph.css";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

//Constants for Market Hours in UTC (9:30 AM - 4:00 PM EST is 14:30 - 21:00 UTC)
const MARKET_OPEN_UTC_HOUR = 14;
const MARKET_OPEN_UTC_MINUTE = 30;
const MARKET_CLOSE_UTC_HOUR = 21;

// Helper to check if a timestamp is within market hours
const isWithinMarketHours = (timestamp) => {
	const date = new Date(timestamp * 1000);
	const utcHours = date.getUTCHours();
	const utcMinutes = date.getUTCMinutes();

	const isAfterOpen =
		utcHours > MARKET_OPEN_UTC_HOUR ||
		(utcHours === MARKET_OPEN_UTC_HOUR && utcMinutes >= MARKET_OPEN_UTC_MINUTE);
	const isBeforeClose = utcHours < MARKET_CLOSE_UTC_HOUR;

	return isAfterOpen && isBeforeClose;
};

// Creates a gradient for the chart background fill
const createGradient = (ctx, chartArea) => {
	const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
	gradient.addColorStop(0, "rgba(0, 200, 100, 1)"); // Green at the top
	gradient.addColorStop(1, "rgba(0, 200, 100, 0)"); // Transparent at the bottom
	return gradient;
};

//A plugin to forcibly fill the area under the line
const forceFillPlugin = {
	id: "forceFill",
	beforeDatasetsDraw(chart) {
		const { ctx, chartArea, data } = chart;
		data.datasets.forEach((dataset, i) => {
			if (!dataset.fill) return;

			const meta = chart.getDatasetMeta(i);
			const points = meta.data.map((point) => point.getProps(["x", "y"], true));

			ctx.save();
			ctx.beginPath();
			ctx.moveTo(points[0].x, chartArea.bottom);
			points.forEach((point) => ctx.lineTo(point.x, point.y));
			ctx.lineTo(points[points.length - 1].x, chartArea.bottom);
			ctx.closePath();

			const bgColor =
				typeof dataset.backgroundColor === "function"
					? dataset.backgroundColor({ chart, datasetIndex: i })
					: dataset.backgroundColor;

			ctx.fillStyle = bgColor;
			ctx.fill();
			ctx.restore();
		});
	},
};

export const StockGraphOneDay = ({ ticker }) => {
	const [tradeData, setTradeData] = useState(null);
	const [isMarketOpen, setIsMarketOpen] = useState(true); // Adjust if you have logic to update this
	const [isLoading, setIsLoading] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		let intervalId;

		const loadData = async () => {
			try {
				setIsLoading(true);
				setFetchError(null);
				await fetchStockDataOneDay(ticker, setTradeData);
			} catch (error) {
				setFetchError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (ticker) {
			loadData();
			// Refresh data every 10 seconds
			intervalId = setInterval(loadData, 10_000);
		}

		return () => clearInterval(intervalId);
	}, [ticker]);

	// Extract timestamps and values
	const { timestamp = [], indicators } = tradeData;
	const openValues = indicators?.quote?.[0]?.open || [];
	const closeValues = indicators?.quote?.[0]?.close || [];
	const dataValues = isMarketOpen ? openValues : closeValues;

	// Filter data points that are within market hours
	const filteredData = timestamp
		.map((time, index) => ({
			time,
			value: dataValues[index],
		}))
		.filter(({ time }) => isWithinMarketHours(time));

	// Prepare chart data
	const chartDataOneDay = {
		labels: filteredData.map(({ time }) =>
			new Date(time * 1000).toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			})
		),
		datasets: [
			{
				label: `${ticker} (1 Day)`,
				data: filteredData.map(({ value }) => value),
				borderColor: "rgba(0, 200, 100, 1)",
				backgroundColor: (context) => {
					const { chart } = context;
					const { ctx, chartArea } = chart;
					if (!chartArea) {
						// Fallback color if chart isn't fully rendered yet
						return "rgba(0, 200, 100, 0.2)";
					}
					return createGradient(ctx, chartArea);
				},
				pointRadius: 0, // Hide individual points
				tension: 0, // Straight lines instead of smoothed
				fill: "origin", // Fill area below the line
			},
		],
	};

	// Chart configuration
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				mode: "index",
				intersect: false,
				callbacks: {
					label: (context) => `Stock Value: $${context.formattedValue}`,
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: "#fff",
					font: { size: 12 },
					maxTicksLimit: 10,
					autoSkip: true,
				},
				grid: {
					display: false,
				},
			},
			y: {
				ticks: {
					color: "#fff",
					font: { size: 12 },
				},
				grid: {
					color: "rgba(200, 200, 200, 0.2)",
					borderDash: [5, 5],
				},
			},
		},
	};

	return (
		<div id="stock-graph-container">
			<Line data={chartDataOneDay} options={options} plugins={[forceFillPlugin]} />
		</div>
	);
};
