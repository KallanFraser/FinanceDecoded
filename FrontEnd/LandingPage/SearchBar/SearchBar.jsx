/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
				const cik = await CIKResponse.json();
				navigate(`/CompanyPage/${cik}`);
			}
		} catch (error) {
			console.log("Error fetching company CIK", error);
		}
	};

	const handleInputChange = async (event) => {
		const currentSearchValue = event.target.value;
		setSearchValue(currentSearchValue);

		try {
			const response = await fetch("http://localhost:3000/suggestCompanies", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ companyName: currentSearchValue }),
			});

			if (response.ok) {
				const data = await response.json();
				setSuggestions(data);
				setShowSuggestions(true);
			}
		} catch (error) {
			console.log("Error fetching company suggestions", error);
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
