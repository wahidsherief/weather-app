import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import Cities from '../City'

export default function SearchBar(props) {

    const fetchWeather = (data) => {
        props.search(data.name, data.coord.lon, data.coord.lat);
    }

    return (
        <Stack>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={Cities}
                getOptionLabel={option => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search city weather"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
                onChange={(e, v) => fetchWeather(v)}
            />
        </Stack>
    );
}
