import {Tag} from "@carbon/react";

export default function PopularCities({popularCities, onPopularCityClick}) {

    return (
        <div className="popular-cities">
            <h3>Most viewed cities:</h3>
            <div className="tag-container">
                {popularCities.map(city => (
                    <Tag
                        key={city.id}
                        type="blue"
                        onClick={(e) => {
                            e.preventDefault();
                            onPopularCityClick(city)
                        }}
                        className="city-tag"
                    >
                        {city.name} ({city.viewCount} views)
                    </Tag>
                ))}
            </div>
        </div>
    );
}