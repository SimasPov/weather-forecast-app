import {ComboBox} from "@carbon/react";
import React from "react";

export default function SearchComponent({cities, selectedCity, onCitySelection }) {
    return (
        <div className="search-container">
            <ComboBox
                allowCustomValue
                items={cities}
                itemToString={(item) => (item ? item.name : '')}
                selectedItem={selectedCity}
                onChange={onCitySelection}
                id="dropdown"
                placeholder="Search by city"
            />
        </div>
    );
}