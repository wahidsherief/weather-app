import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid, Stack } from "@mui/material";
import Cloud from '@mui/icons-material/Cloud';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import SearchBar from "./SearchBar";
import '../App.css';

// api key for openweathermap
const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {

    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();

    useEffect(() => {
        // get current location
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                loadWeatherData(position.coords.latitude, position.coords.longitude);
            });
        }
    }, []);


    const time = Math.round((new Date()).getTime() / 1000);

    const search = (name, lon, lat) => {
        setLon(lon);
        setLat(lat);
        setCity(name);
        loadWeatherData(lat, lon);
    }


    const loadWeatherData = async (lat, lon) => {
        const API = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${API_KEY}`;
        await axios.get(API).then((res) => {
            setWeather({
                main: res.data.current.weather[0].main,
                descp: res.data.current.weather[0].description,
                temp: res.data.current.temp,
                humidity: res.data.current.humidity,
                press: res.data.current.pressure,
                sunrise: res.data.current.sunrise,
                sunset: res.data.current.sunset,
            })
        });
    }

    //Converting Kelvin to Celcius
    let k = weather.temp;
    let C = k - 273.15

    // convert unix time to readable time
    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hours = a.getHours();
        var minutes = a.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours;
        // appending zero in the start if hours less than 10
        minutes = minutes < 10 ? '0' + minutes : minutes;

        var time = date + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
        return time;
    }

    // search result
    const renderWeather = () => {
        return (
            <Grid container sx={{ p: 4 }}>
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3">
                        {city ? city : "Your City"}
                    </Typography>
                    <Typography variant="h6" component="h6" style={{ textTransform: "capitalize", fontWeight: 'normal' }}>
                        {weather.descp}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {weather.descp && weather.descp.includes("cloud") | weather.descp.includes("rain") ? <Cloud sx={{ fontSize: 100 }} /> : <WbSunnyRoundedIcon sx={{ fontSize: 100 }} />}
                </Grid>
                <Grid item style={{ textAlign: "right" }} xs={6}>
                    <Typography variant="h3" component="h3" style={{ color: "teal", textAlign: "right", fontWeight: 'bold' }}>
                        {C.toFixed(2)} &#8451;
                    </Typography>
                    <Stack style={{ fontSize: 10, fontWeight: 'bold' }}>
                        <span>Humidity: {weather.humidity}%</span>
                        <span>Pressure: {weather.press} hPa</span>
                        <span>Sunrise: {timeConverter(weather.sunrise)} </span>
                        <span>Sunset: {timeConverter(weather.sunset)} </span>
                    </Stack>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={4} direction='row' alignItems='center' justify='center'>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <SearchBar search={search} />
            </Grid>
            {weather && renderWeather()}
        </Grid>
    )

}

export default Home;
