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
    }, [location.search]);

    return {
        startDate,
        endDate,
        setDates
    };
};