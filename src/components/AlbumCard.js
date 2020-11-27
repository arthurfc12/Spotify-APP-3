import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

class AlbumCard extends React.Component {

    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            album:"",
            correctAlbum:"",
            submission:false,
            a1:"",
            submitted:false
        }
        this.state.correctAlbum = this.props.musica.album.name;
        this.handleRefresh = this.handleRefresh.bind(this);
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

    onAlbumChange(event) {
        this.setState({album: event.target.value})
      }

    handleRefresh() {
		window.location.reload();
	}

    handleSubmit( event ) {
        event.preventDefault();
        // this.state.submission = true
        // console.log(this.state);
        let c1;
        let r1;
        c1 = this.state.album
        r1 = this.state.correctAlbum
        console.log(c1)
        console.log(r1)
        
        this.state.submission=true;

        if(c1 === r1){
            this.state.a1 = "Acertou!"
        } else {
            this.state.a1 = "Errou!"
        }

        // console.log(this.state);
        this.forceUpdate()
      }

    // sendLog() {
    //     var myHeaders = new Headers();

    //     myHeaders.append("Content-Type", "application/json");
    //     var raw = JSON.stringify({"id":this.state.userId.id,"musica":this.props.musica.name+" por "+this.props.musica.artists[0].name,"correct":this.state.correctDate,"guess":this.state.date});
    //     // console.log(raw)
    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw
    //     };
        
    //     fetch("http://localhost:5000/save", requestOptions) //http://localhost:5000/save to run locally
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));

    //     this.setState({submitted:true})
    // }

    render(){
        if(this.state.submission===false){
            console.log(this.props.musica.album.name)
            return(
                <div className="titulos">
                    <h3>Musica: {this.props.musica.name}</h3>

                    <p className="fontes">Adivinhe o Album:</p>
                    <div className="fontes">
                        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)}>
                            <div>
                                <input type="album" value={this.state.album} onChange={this.onAlbumChange.bind(this)}/>
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
            }
            return(
                <div className="titulos">
                    <h3>Resultado:</h3>
                    <p className="fontes">{this.state.a1}</p>
                    <p className="fontes">Album Correto: {this.props.musica.album.name}</p>

                    <button className="playAgain" onClick={this.handleRefresh}>
						{' '}
						<div> Ver outros Jogos</div>
					</button>
                </div>

                
            );
        }
    }
}
export default AlbumCard;