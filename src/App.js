import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar"
import Home from "./Components/Home";
import About from "./Components/About";
import StatewiseDeaths from "./Components/StatewiseDeaths";
import Vaccination from "./Components/Vaccination";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Awareness from "./Components/Awareness";
const App = () => {
  
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/statewisedeaths">
            <StatewiseDeaths />
          </Route>
          <Route exact path="/vaccination">
            <Vaccination />
          </Route>
          <Route exact path="/awareness">
            <Awareness />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;