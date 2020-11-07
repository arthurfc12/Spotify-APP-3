import React from 'react';
import Home from "./components/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";
  

export default props => (
    <Router>
        {/* <Route exact path = "/" component={Login}/> */}
        <Route exact path='/' component={() => { 
            window.location.href = 'https://spotifyapiback.herokuapp.com/'; 
            return null;
        }}/>
        <Route path = "/home" component={Home} />
    </Router>
)