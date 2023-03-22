import React, { useState, useEffect, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
    color: 'white',
    size: 110,
    animate: true
};

const SearchLocation = () => {
    const dataFetchedRef = useRef(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [first, setFirst] = useState("CLEAR_DAY")
    const [weather, setWeather] = useState({
        city: '',
        country: '',
        Icon: '',
        Temperature: '',
        Humidity: '',
        Visibility: '',
        Wind_Speed: '',
        envr: '',
        main: ''
    });

    const apiKeys = {
        key: "1c63f6b600d73337359d0a8ac83c9b4e",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const search = async (city) => {
        try {
            const res = await fetch(`${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
                }&units=metric&APPID=${apiKeys.key}`);
            const data = await res.json();
            setWeather({
                city: data.name,
                country: data.sys.country,
                Icon: data.weather[0].icon,
                Temperature: data.main.temp,
                Humidity: data.main.humidity,
                Visibility: data.visibility,
                Wind_Speed: data.wind.speed,
                envr: data.weather[0].main,
                main: data.main
            })
            switch (data.weather[0].main) {
                case "Haze":
                    setFirst("CLEAR_DAY");
                    break;
                case "Clouds":
                    setFirst("CLOUDY");
                    break;
                case "Rain":
                    setFirst("RAIN");
                    break;
                case "Snow":
                    setFirst("SNOW");
                    break;
                case "Dust":
                    setFirst("WIND");
                    break;
                case "Drizzle":
                    setFirst("SLEET");
                    break;
                case "Fog":
                    setFirst("FOG");
                    break;
                case "Smoke":
                    setFirst("FOG");
                    break;
                case "Tornado":
                    setFirst("WIND");
                    break;
                case "Thunderstorm":
                    setFirst("WIND");
                    break;
                default:
                    setFirst("CLEAR_DAY");
            }
            setQuery("")
        } catch (error) {
            setWeather("");
            setQuery("");
            setError({ message: "Not Found", query: query });
        }
    }


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // Call your function here, passing in the input value
            search(query);

            // Clear the input field
            setQuery("");
        }
    };



    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        search("New Delhi")
        // eslint-disable-next-line


    }, [])

    return (
        <>
            <div className="search">
                <div className="icon">
                    {typeof weather.main != "undefined" ? (
                        <ReactAnimatedWeather
                            icon={first}
                            color={defaults.color}
                            size={defaults.size}
                            animate={defaults.animate}
                        />
                    ) : ("")}
                    <h1>{weather.envr}</h1>
                </div>
                <div className="input">
                    <input
                        placeholder='Search any city'
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyDown={handleKeyDown}
                    />
                    <BiSearch className='searchIcon' onClick={search} />
                </div>
                <div className="result">
                    {typeof weather.main != "undefined" ? (
                        <div className="place">
                            <h3>{weather.city}, {weather.country}</h3>
                            <img src={`https://openweathermap.org/img/wn/${weather.Icon}.png`} alt="Icon" />
                        </div>
                    ) : ("")}

                    <ul>
                        {typeof weather.main != "undefined" ? (
                            <div>
                                <li>
                                    <p>Temperature</p>
                                    <p>{weather.Temperature}°c</p>
                                </li>
                                <li>
                                    <p>Humidity</p>
                                    <p>{weather.Humidity}%</p>
                                </li>
                                <li>
                                    <p>Visibility</p>
                                    <p>{weather.Visibility}mi</p>
                                </li>
                                <li>
                                    <p>Wind Speed</p>
                                    <p>{weather.Wind_Speed} km/h</p>
                                </li>
                            </div>
                        ) : (
                            <li>
                                {error.query} {error.message}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SearchLocation
