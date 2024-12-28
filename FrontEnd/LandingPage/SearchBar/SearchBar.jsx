/** @format */

//Library imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//CSS Import
import "./SearchBar.css";

export const SearchBar = () => {
	const [searchValue, setSearchValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const navigate = useNavigate();

	const handleFormSubmission = async (event) => {
		event.preventDefault();
		try {
			const CIKResponse = await fetch(`http://localhost:3000/getCompanyCIK`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ companyName: searchValue }),
			});

			if (CIKResponse.ok) {
				const companyCIK = await CIKResponse.json();
				navigate(`/CompanyPage/${companyCIK}`);
			}
		} catch (error) {
			console.log("Error fetching company CIK", error);
		}
	};

	const handleInputChange = async (event) => {
		const currentSearchValue = event.target.value;
		setSearchValue(currentSearchValue);

		try {
			const response = await axios.post("http://localhost:3000/getCompanySuggestions", {
				companyName: currentSearchValue,
			});

			setSuggestions(response.data);
			setShowSuggestions(true);
		} catch (error) {
			console.log("Error fetching company suggestions", error);
			// Optionally handle specific error scenarios
			if (error.response) {
				console.error("Server responded with an error:", error.response.status);
			} else if (error.request) {
				console.error("Request made but no response received:", error.request);
			} else {
				console.error("Error setting up the request:", error.message);
			}
		}
	};

	const handleSuggestionClick = (suggestion) => {
		setSearchValue(suggestion);
		setShowSuggestions(false);
	};

	return (
		<div id="search-bar-section">
			<h1>Search For Companies</h1>
			<div id="search-bar">
				<form id="search-bar-form" onSubmit={handleFormSubmission}>
					<input
						type="search"
						placeholder="Enter A Company's Name Here"
						value={searchValue}
						onChange={handleInputChange}
						onFocus={() => setShowSuggestions(true)}
						onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
						aria-label="Search"
					/>
					<button type="submit">Enter</button>
				</form>
				{showSuggestions && suggestions.length > 0 && (
					<ul id="suggestions-list">
						{suggestions.map((suggestion, index) => (
							<li key={index} onMouseDown={() => handleSuggestionClick(suggestion)}>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
