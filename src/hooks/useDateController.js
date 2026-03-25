import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useDateController = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const readUrlDates = () => {
        const params = new URLSearchParams(location.search);
        return {
            start: params.get("startDate"),
            end: params.get("endDate"),
        };
    };

    const updateUrl = (start, end) => {
        const params = new URLSearchParams(location.search);
        
        if (start) params.set("startDate", start);
        else params.delete("startDate");
        
        if (end) params.set("endDate", end);
        else params.delete("endDate");

        navigate({ search: params.toString() }, { replace: true });
    };

    const setDates = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        updateUrl(start, end);
    };

    useEffect(() => {
        const { start, end } = readUrlDates();

        if (start) setStartDate(start);
        if (end) setEndDate(end);

        if (!start && !end && (!startDate || !endDate)) {
            const now = new Date();

            const formatDate = (date) => {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const d = String(date.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
            };

            const firstDay = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
            const lastDay = formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));

            setDates(firstDay, lastDay);
        }
    }, [location.search, startDate, endDate]);

    return {
        startDate,
        endDate,
        setDates
    };
};