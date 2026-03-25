import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCampuses } from "../services/api";
import logo from "../assets/apse-color-logo.png";
import "../App.css";
import MenuDrawer from "./MenuDrawer";
import { useDateController } from "../hooks/useDateController";

const Header = ({ 
	user,
	onCampusChange,
	onDateChange,
	onLogout
}) => {
	const [activeView, setActiveView] = useState("All");
	const [campuses, setCampuses] = useState([]);
	const [selectedCampus, setSelectedCampus] = useState(null);

	const { startDate, endDate, setDates } = useDateController();
	const navigate = useNavigate();
	const location = useLocation();

	let navClass;
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

	const handleCampusChange = (e) => {
		const newCampus = Number(e.target.value);
		setSelectedCampus(newCampus);
		updateUrlParams({ campus: newCampus, start: startDate, end: endDate });
		if (onCampusChange) onCampusChange(newCampus);
	};

	const handleMonthChange = (direction) => {
		if (!startDate) return;

		const [yearStr, monthStr] = startDate.split("-");
		let year = parseInt(yearStr, 10); 
		let month = parseInt(monthStr, 10) - 1; // <--- FIX: zero-index

		month += direction;

		if (month < 0) {
			month = 11;
			year -= 1;
		} else if (month > 11) {
			month = 0;
			year += 1;
		}

		const formatDate = (date) => {
			const y = date.getFullYear();
			const m = String(date.getMonth() + 1).padStart(2, "0");
			const d = String(date.getDate()).padStart(2, "0");
			return `${y}-${m}-${d}`;
		};

		const newStart = formatDate(new Date(year, month, 1));
		const newEnd = formatDate(new Date(year, month + 1, 0));

		setDates(newStart, newEnd);
		if (onDateChange) onDateChange(newStart, newEnd);
	};


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

		if (urlCampus) setSelectedCampus(urlCampus);
		else if (user?.campus_id) setSelectedCampus(user.campus_id);

		const now = new Date();

		let initialStart = urlStart
			? new Date(urlStart)
			: new Date(now.getFullYear(), now.getMonth(), 1);

		let initialEnd = urlEnd
			? new Date(urlEnd)
			: new Date(initialStart.getFullYear(), initialStart.getMonth() + 1, 0);

		if (
			initialEnd.getFullYear() !== initialStart.getFullYear() ||
			initialEnd.getMonth() !== initialStart.getMonth()
		) {
			initialEnd = new Date(initialStart.getFullYear(), initialStart.getMonth() + 1, 0);
		}

		const newStartStr = initialStart.toISOString().split("T")[0];
		const newEndStr = initialEnd.toISOString().split("T")[0];

		setDates(newStartStr, newEndStr);
		if (onDateChange) onDateChange(newStartStr, newEndStr);
	}, [user]);

	const onDashboard = location.pathname === "/dashboard";
	const showDashboardFilters = user && onDashboard;

	const publicNav = [];
	const authNav = ["Dashboard" , "Services"];
	const navItems = user ? authNav : publicNav;

	const skipped = ["Test", "Mission Valley Campus"];

	const handleViewClick = (view) => {
		setActiveView(view);

		const routeMap = {
			About: "/about",
			Contact: "/contact",
			Services: "/services",
			Dashboard: "/dashboard",
		};

		const path = routeMap[view];
		if (path) navigate(path);
	};

	const handleConnectClick = () => {
		if (user) {
			if (onLogout) onLogout();
			navigate("/connection");
		} else {
			navigate("/connection");
		}
	};

	{user ? navClass="nav-button log-out" : navClass="nav-button	log-in"}

	return (
		<header className="header">
			<nav className="nav">
				<div className="logo-left">
					<img alt="View the Apse" src={logo} />
				</div>
				{showDashboardFilters && (
					<div className="nav-center">
						<select name="campus-selector" className="campus-selector" value={selectedCampus || ""} onChange={handleCampusChange} disabled={!campuses.length}>
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

						{/* <div className="month-selector">
							<button className="monthly-back" onClick={() => handleMonthChange(-1)}>&lt;</button>
							<span className="month-title">
								{`${months[new Date(startDate).getUTCMonth()]} ${new Date(startDate).getFullYear()}`}
							</span>
							<button className="monthly-forward" onClick={() => handleMonthChange(1)}>&gt;</button>
						</div> */}
					</div>
				)}
				{/* <button className="nav-hamburger" endIcon={<MenuIcon />} ></button> */}
				<MenuDrawer
					user={user}
					onLogout={onLogout}
				/>
				<div className="nav-right">
					{navItems.map((view) => (
						<button
							key={view}
							className={`nav-button ${activeView === view ? "active" : ""}`}
							onClick={() => handleViewClick(view)}
						>
							{view}
						</button>
					))}

					<button
					className={navClass}
					onClick={handleConnectClick}
					>
					{user ? "Log Out" : "Log In"}
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
