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
        console.log(this.props)
        fetch('https://api.spotify.com/v1/recommendations?seed_genres='+this.props.seedGenres
                +"&min_acousticness"+String(this.props.valueMean.acousticness-0.1)+"&max_acousticness"+String(this.props.valueMean.acousticness+0.1)+
                "&min_danceability"+String(this.props.valueMean.danceability-0.1)+"&max_danceability"+String(this.props.valueMean.danceability+0.1)+
                "&min_energy"+String(this.props.valueMean.energy-0.1)+"&max_energy"+String(this.props.valueMean.energy+0.1)+
                "&min_liveness"+String(this.props.valueMean.liveness-0.1)+"&max_liveness"+String(this.props.valueMean.liveness+0.1), requestOptions)
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