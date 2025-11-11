import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCampuses } from "../services/api";
import { months } from "../utils/helper";
import logo from "../assets/apse-color-logo.png";
import "../App.css";

const Footer = ({ 
	user, 
	onCampusChange, 
	onDateChange
}) => {
	const [activeView, setActiveView] = useState("All");
	const [campuses, setCampuses] = useState([]);
	const [selectedCampus, setSelectedCampus] = useState(null);

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	// ------------------ URL Helpers ------------------
	const getCampusFromUrl = () => {
		const params = new URLSearchParams(location.search);
		const campus = params.get("campus");
		return campus ? Number(campus) : null;
	};

	const getDateFromUrl = () => {
		const params = new URLSearchParams(location.search);
		const start = params.get("startDate");
		const end = params.get("endDate");
		return { startDate: start, endDate: end };
	};

	const updateUrlParams = ({ campus, start, end }) => {
		const params = new URLSearchParams(location.search);
		if (campus) params.set("campus", campus);
		else params.delete("campus");

		if (start) params.set("startDate", start);
		else params.delete("startDate");

		if (end) params.set("endDate", end);
		else params.delete("endDate");

		navigate({ search: params.toString() }, { replace: true });
	};

	// ------------------ Campus ------------------
	const handleCampusChange = (e) => {
		const newCampus = Number(e.target.value);
		setSelectedCampus(newCampus);
		updateUrlParams({ campus: newCampus, start: startDate, end: endDate });
		if (onCampusChange) onCampusChange(newCampus);
	};

	// ------------------ Month ------------------
	const handleMonthChange = (direction) => {
		if (!startDate) return;
		console.log(direction)
		const [yearStr, monthStr] = startDate.split("-"); // YYYY-MM-DD
		let year = parseInt(yearStr, 10);
		let month = parseInt(monthStr, 10) - 1; // 0-indexed

		// move month by direction
		month += direction;

		// handle year overflow/underflow
		if (month < 0) {
			month = 11;
			year -= 1;
		} else if (month > 11) {
			month = 0;
			year += 1;
		}

		// calculate start and end of month
		const newStart = new Date(year, month, 1).toISOString().split("T")[0];
		const newEnd = new Date(year, month + 1, 0).toISOString().split("T")[0];

		setStartDate(newStart);
		setEndDate(newEnd);

		updateUrlParams({
			campus: selectedCampus,
			start: newStart,
			end: newEnd,
		});

		if (onDateChange) onDateChange(newStart, newEnd);
	};

	// ------------------ Initial Load ------------------
	useEffect(() => {
		const loadCampuses = async () => {
			try {
				const result = await fetchCampuses();
				const campusArray = Array.isArray(result)
					? result
					: result?.records || result?.data || [];
				setCampuses(campusArray);
			} catch (err) {
				console.error("Error loading campuses:", err);
				setCampuses([]);
			}
		};
		loadCampuses();
	}, []);

	useEffect(() => {
		const urlCampus = getCampusFromUrl();
		const { startDate: urlStart, endDate: urlEnd } = getDateFromUrl();

		// Campus
		if (urlCampus) setSelectedCampus(urlCampus);
		else if (user?.campus_id) setSelectedCampus(user.campus_id);

		// Month
		const now = new Date();
		let initialStart = urlStart
			? new Date(urlStart)
			: new Date(now.getFullYear(), now.getMonth(), 1);
		let initialEnd = urlEnd
			? new Date(urlEnd)
			: new Date(initialStart.getFullYear(), initialStart.getMonth() + 1, 0);

		// Ensure only a single month span
		if (
			initialEnd.getFullYear() !== initialStart.getFullYear() ||
			initialEnd.getMonth() !== initialStart.getMonth()
		) {
			initialEnd = new Date(initialStart.getFullYear(), initialStart.getMonth() + 1, 0);
		}

		const newStartStr = initialStart.toISOString().split("T")[0];
		const newEndStr = initialEnd.toISOString().split("T")[0];

		setStartDate(newStartStr);
		setEndDate(newEndStr);

		if (onDateChange) onDateChange(newStartStr, newEndStr);
	}, [user]); // <-- only run on initial load

	// ------------------ Views ------------------
const handleViewClick = (view) => {
    setActiveView(view);

    // Map button labels to routes
    const routeMap = {
      About: "/about",
      Login: "/login",
      Contact: "/contact",
      Dashboard: "/", // assuming "Campus" is your dashboard
    };

    const path = routeMap[view];
    if (path) navigate(path);
  };


	const skipped = ["Test", "Mission Valley Campus"];

	// ------------------ Render ------------------
	return (
		<header className="header">
			<div className="logo-left">
				<img alt="View the Apse" src={logo} />
			</div>

			<nav className="nav">
				{[
					"About",
					"Login",
					"Contact",
					"Dashboard"
				].map((view) => (
					<button
						key={view}
						className={`nav-button ${activeView === view ? "active" : ""}`}
						onClick={() => handleViewClick(view)}
					>
						{view}
					</button>
				))}

				{/* Campus Dropdown */}
				<select value={selectedCampus || ""} onChange={handleCampusChange} disabled={!campuses.length}>
					{campuses.length > 0 ? (
						campuses
							.filter((campus) => !skipped.includes(campus.name))
							.map((campus) => (
								<option key={campus.id || campus.metrics.id} value={campus.metrics?.id || campus.id}>
									{campus.name}
								</option>
							))
					) : (
						<option disabled>Loading Campuses...</option>
					)}
				</select>

				{/* Month Selector */}
				<div className="month-selector">
					<button onClick={() => handleMonthChange(-1)}>&lt;</button>
					<span style={{padding:"10px"}}>
						{startDate
							? months[new Date(startDate).getMonth()] + " " + new Date(startDate).getFullYear()
							: ""}
					</span>
					<button onClick={() => handleMonthChange(1)}>&gt;</button>
				</div>
			</nav>

			<div className="logo-right user-info">
				{user ? (
					<p>{user.user?.name || user.user?.email || "Unknown User"}</p>
				) : (
					<p>Loading user...</p>
				)}
			</div>
		</header>
	);
};

export default Footer;
