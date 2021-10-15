import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grid } from "@mui/material"

import Header from "./components/Header";
import Home from "./components/Home";
import History from "./components/History";

const App = () => {
  return (
    <div className='app' xs={12}>
      <BrowserRouter>
        <Grid container direction='row' alignItems='center'>
          <Grid item sm={8}>
            <h2>WEATHER-APP</h2>
          </Grid>
          <Grid item sm={4}>
            <Header />
          </Grid>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/history" component={History} />
          </Switch>
        </Grid>
      </BrowserRouter>
    </div >
  );
}

export default App;
