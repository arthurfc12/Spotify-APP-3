import React from 'react';
import './components/App.css';
import Routes from "./routes";

// const cors = require("cors");
// const express = require("express");
// const app = express();
// app.use(cors());

class App extends React.Component {

  // getRecommendation() {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Authorization": "Bearer " + this.state.token
  //     }
  //   }

  //   fetch('https://api.spotify.com/v1/browse/categories', requestOptions)
  //   .then((response) => {
  //     console.log(response.json().then(
  //       (data) => {console.log(data)}
  //     ))
  //   })
  // }


  render(){
    return (
      <div>
        <Helmet>
          <title>Spotify App</title>
        </Helmet>
        <Routes/>
      </div>
    );
  }
}

export default App;
