import React from 'react';
import "./App.css";

class Log extends React.Component {

    constructor(props){
        super(props)
        this.state={
            hist:undefined,
            recents:"",
        }
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          console.log(this.props.id)
          fetch("https://peaceful-cliffs-57360.herokuapp.com/tentativas/"+String(this.props.id), requestOptions)  //http://localhost:5000/tentativas/ to run locally
            .then(response => response.json()) 
            .then(result => this.setState({hist:result}))
            .catch(error => console.log('error', error));
          fetch('https://api.spotify.com/v1/me/player/recently-played', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({recents: data.items}))
    }
    


    render() {
        if(this.state.hist!==undefined || this.state.recents!==""){
            const recArray = this.state.hist
            const recArrayR = this.state.recents
            // console.log(this.props.id)
            // console.log(recArray)
            // console.log(recArray.length)
            if(recArray.length!==0){
                return(
                    <div className="titulos">
                        <h1>Histórico</h1>
                        <h2>Jogo: </h2>
                        {recArray.map(function(d, idx){
                            return (<li className="lista">{d.musica}: Seu chute {d.guess} >> Correto {d.correct}</li>)
                        })}

                        <h2>Músicas ouvidas recentememte: </h2>
                        {recArrayR.map(function(d, idx){
                            return (<li className="lista">{d.musica}</li>)
                        })}

                    </div>
                );
            } else {
                return(
                    <div className="titulos">
                        <h1>Histórico</h1>
                        <h3>Você não jogou ainda</h3>
                    </div>
                )
            }

        } else {
            return(
                <div className="titulos">
                    <h1>Histórico</h1>
                    Carregando
                </div>
            );
        }
    }
}
 
export default Log;