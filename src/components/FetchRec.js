import React from "react";
import Slider from 'react-input-slider';
import "./App.css"

class FetchRec extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            recommendations:""
        }        
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }

        var acoustic = ""
        var dance = ""
        var energy = ""
        var liveness = ""
        
        if(this.props.acousticness<0.15) {
            acoustic = "&max_acousticness="+String(this.props.acousticness+0.15)+"&min_acousticness=0"
        } else if(this.props.acousticness>0.85) {
            acoustic = "&min_acousticness=0"+String(this.props.acousticness-0.15)+"&max_acousticness=0"
        } else {
            acoustic = "&min_acousticness=0"+String(this.props.acousticness-0.15)+"&max_acousticness="+String(this.props.acousticness+0.15)
        }

        if(this.props.energy<0.15) {
            energy = "&max_energy="+String(this.props.energy+0.15)+"&min_energy=0"
        } else if(this.props.energy>0.85) {
            energy = "&min_energy=0"+String(this.props.energy-0.15)+"&max_energy=0"
        } else {
            energy = "&min_energy=0"+String(this.props.energy-0.15)+"&max_energy="+String(this.props.energy+0.15)
        }

        if(this.props.liveness<0.15) {
            liveness = "&max_liveness="+String(this.props.liveness+0.15)+"&min_liveness=0"
        } else if(this.props.liveness>0.85) {
            liveness = "&min_liveness=0"+String(this.props.liveness-0.15)+"&max_liveness=0"
        } else {
            liveness = "&min_liveness=0"+String(this.props.liveness-0.15)+"&max_liveness="+String(this.props.liveness+0.15)
        }

        if(this.props.danceability<0.15) {
            dance = "&max_danceability="+String(this.props.danceability+0.15)+"&min_danceability=0"
        } else if(this.props.danceability>0.85) {
            dance = "&min_danceability=0"+String(this.props.danceability-0.15)+"&max_danceability=0"
        } else {
            dance = "&min_danceability=0"+String(this.props.danceability-0.15)+"&max_danceability="+String(this.props.danceability+0.15)
        }

        fetch('https://api.spotify.com/v1/recommendations?seed_genres='+this.props.seedGenres+acoustic+energy+dance+liveness, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({recommendations:data}))
    }

    render(){
        if(this.state.recommendations!=""){
            const recArray = this.state.recommendations.tracks
            if(recArray.length!==0){
                return(
                    <div>
                        {recArray.map(function(d, idx){
                            return (<li className="lista" key={idx}>{d.name} by {d.artists[0].name}</li>)
                        })}
                    </div>
                );
            } else {
                return(
                    <div>
                        <h3>Não foram encontradas recomendações</h3>
                    </div>
                )
            }
        } else {
            return(
                <div>
                    Carregando
                </div>
            );
        }
    }
}
export default FetchRec;