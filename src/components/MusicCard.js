import { CompareSharp } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

class MusicCard extends React.Component {

    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            date:"",
            points:0,
            correctDate:"",
            submission:false,
            a1:"",
            a2:"",
            a3:"",
            submitted:false
        }
        this.state.correctDate = this.props.musica.album.release_date;
    }

    componentDidMount(){
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }
        console.log(this.props)
        fetch('https://api.spotify.com/v1/me', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({userId:data}))
    }

    onYearChange(event) {
        this.setState({year: event.target.value})
      }
    
    onMonthChange(event) {
        this.setState({month: event.target.value})
      }
    
    onDayChange(event) {
        this.setState({day: event.target.value})
      }
      
    onDateChange(event) {
        this.setState({date: event.target.value})
      }

    handleSubmit( event ) {
        event.preventDefault();
        // this.state.submission = true
        // console.log(this.state);
        let c1;
        let r1;
        c1 = this.state.date
        r1 = this.state.correctDate
        console.log(c1)
        console.log(r1)
        
        this.state.submission=true;

        if(c1.substring(0,4) === r1.substring(0,4)){
            this.state.a1 = "Acertou!"
        } else {
            this.state.a1 = "Errou!"
        }

        if(c1.substring(5,7) === r1.substring(5,7)){
            this.state.a2 = "Acertou!"
        } else {
            this.state.a2 = "Errou!"
        }

        if(c1.substring(8) === r1.substring(8)){
            this.state.a3 = "Acertou!"
        } else {
            this.state.a3 = "Errou!"
        }

        // console.log(this.state);
        this.forceUpdate()
      }

    sendLog() {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"id":this.state.userId.id,"musica":this.props.musica.name+" por "+this.props.musica.artists[0].name,"correct":this.state.correctDate,"guess":this.state.date});
        // console.log(raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };
        
        fetch("https://peaceful-cliffs-57360.herokuapp.com/save", requestOptions) //http://localhost:5000/save to run locally
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        this.setState({submitted:true})
    }

    render(){
        if(this.state.submission===false){
            console.log(this.props.musica)
            return(
                <div className="titulos">
                    <h3>Música: {this.props.musica.name} por {this.props.musica.artists[0].name}</h3>

                    <p className="fontes">Selecione a data de lançamento:</p>
                    <div className="fontes">
                        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)}>
                            <div>
                                <label className="margemLateral">Date</label>
                                <input type="date" value={this.state.date} onChange={this.onDateChange.bind(this)}/>
                            </div>
                            <div className="button">
                                <Button type="submit" variant="contained" color="primary">Enviar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            // console.log(this.state)
            if(this.state.submitted===false){
                this.state.submitted=true
                this.sendLog()
            }
            return(
                <div className="titulos">
                    <h3>Pontuação</h3>
                    <p className="fontes">Acertou o ano: {this.state.a1}</p>
                    <p className="fontes">Acertou o mes: {this.state.a2}</p>
                    <p className="fontes">Acertou o dia: {this.state.a3}</p>
                </div>
            );
        }
    }
}
export default MusicCard;