import React, { useState } from 'react';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const parametros = this.getHashParams();
        this.state = {
          token:"",
          refresh_token:"",
          categorias:""
        }
        if(this.state.token==="") {
          this.state.token = parametros.access_token;
          this.state.refresh_token = parametros.refresh_token;
        }
        console.log(this.state);
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getRecommendation() {
        const requestOptions = {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + this.state.token
          }
        }
    
        fetch('https://api.spotify.com/v1/browse/categories', requestOptions)
        .then((response) => {
          response.json().then(
            (data) => {console.log("data", + data)}
          )
        })
    }

    render(){
        this.getRecommendation();
        return(
            <div>
                
            </div>
        )
    }
}
