import {Cloudy, Sun} from "@carbon/icons-react";

export const getWeatherIcon = (code) => {
    if (code <= 3) return <Sun size={32} />;
    return <Cloudy size={32} />;
};

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};