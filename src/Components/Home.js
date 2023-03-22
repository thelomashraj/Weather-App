import React, { useState, useEffect, useRef } from 'react'
import SearchLocation from './SearchLocation';
import Timer from 'react-live-clock';
import Clock from './Clock'

const Home = () => {
    const dataFetchedRef = useRef(false);
    const [info, setInfo] = useState({
        city: "",
        country: '',
        temp: '',
        icon: ''
    })

    const apiKeys = {
        key: "1c63f6b600d73337359d0a8ac83c9b4e",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    };

    const getWeather = async (lat, lon) => {
        try {
            const res = await fetch(`${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`);
            const data = await res.json();
            setInfo({
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                icon: data.weather[0].icon
            })
        } catch (error) {
            alert("Please Allow Location Access to See Realtime Weather.")
        }
    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    getWeather(28.67, 77.22);
                    alert(
                        "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
                    );
                    console.error(error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <section className="container">
                <div className="weatherContainer">
                    <div className="show">
                        <div className='overlay'>
                            <div id="city">
                                <h1>{info.city}</h1>
                                <p>{info.country}</p>
                            </div>
                            <div className="clockContainer">
                                <Clock />
                            </div>
                            <div id="date">
                                <Timer format="hh:mm:ss" interval={1000} ticking={true} />
                                <p>{dateBuilder(new Date())}</p>
                            </div>
                            <div id="temp">
                                {Math.floor(info.temp)}°c
                            </div>
                        </div>
                    </div>

                    <SearchLocation />
                </div>

                <footer>
                    --- Developed by <a href="http://lomashraj.netlify.app"><b>Lomash Raj</b></a> ---
                </footer>
            </section>
        </>
    )
}

export default Home