import React from 'react';
import Home from "./components/Home";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";
  

export default props => (
    <Router>
        {/* <Route exact path = "/" component={Login}/> */}
        <Route exact path='/' component={() => { 
            window.location.href = 'https://spotifyapiback.herokuapp.com/'; // http://localhost:8888
            return null;
        }}/>
        <Route path = "/home" component={Home} />
    </Router>
)