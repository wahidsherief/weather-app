import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import SearchBar from "./SearchBar";

// api key for openweathermap
const API_KEY = process.env.REACT_APP_API_KEY;

const History = () => {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState('');
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                loadWeatherData(position.coords.latitude, position.coords.longitude);
            });
        }
    }, []);

    // search for weather data by lat and long
    const search = (name, lon, lat) => {
        setLon(lon);
        setLat(lat);
        setCity(name);
        loadWeatherData(lat, lon);
    }

    const time = Math.round((new Date()).getTime() / 1000);


    const loadWeatherData = async (lat, lon) => {
        const API = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${API_KEY}`;

        await axios.get(API).then((res) => {
            console.log(res.data);
            setWeather(res.data.hourly)
        });
    }

    // covert unix time to readable time
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

    // render search result
    const renderWeather = () => {
        return (
            <Grid container>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <h3>Weather History : {city ? city : "Your City"}</h3>
                </Grid>
                <Grid sx={{ flexGrow: 1, mt: 3, mb: 3, ml: 1 }} >
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={1} alignItems='center'>
                            {weather.map((value, index) => (
                                <Grid key={index} item>
                                    <Paper sx={{ height: 200, width: 150, textAlign: 'center' }}>
                                        <Stack sx={{ p: 2 }}>
                                            <span style={{ marginBottom: 10, fontSize: 12 }}>
                                                {timeConverter(value.dt)}
                                            </span>
                                            <h4 style={{ color: 'teal', margin: 10, fontWeight: 'bold', fontSize: 20 }}>
                                                {(value.temp - 273.15).toFixed(2)} C
                                            </h4>
                                            <span style={{ margin: 6, fontStyle: 'italic', fontSize: 16 }}>
                                                {value.weather[0].main}
                                            </span>
                                            <span style={{ marginTop: 10, fontSize: 12 }}>
                                                <Stack>
                                                    <span>
                                                        Humidity: {value.humidity}
                                                    </span>
                                                    <span>
                                                        Pressure: {value.pressure} hPa
                                                    </span>
                                                </Stack>
                                            </span>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    };


    return (
        <Grid container spacing={4} direction='row' alignItems='center' justify='center'>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <SearchBar search={search} />
            </Grid>
            {weather && renderWeather()}
        </Grid >
    );
}

export default History;
