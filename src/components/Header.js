/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Grid } from "@mui/material"
import { Link } from 'react-router-dom';

const Header = () => {
    return (

        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            justify='space-between'
            alignItems="center"
            spacing={1}
        >
            <Grid item spacing={6}>
                <Link to="/" class='top-nav-link' >Home</Link>
            </Grid>
            <Grid item spacing={6}>
                <Link to="/history" class='top-nav-link' >History</Link>
            </Grid>
        </Grid >
    );
}

export default Header;