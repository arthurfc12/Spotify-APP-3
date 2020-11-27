import React from 'react';
import AlbumCard from './AlbumCard.js';

class AlbumSelect extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tracks:""
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
          }
        var sorteio = Math.floor(Math.random() * Object.keys(this.props.playlistList).length);
        fetch(String(this.props.playlistList[sorteio].tracks.href), requestOptions) //.tracksLink
            .then(response => response.json())
            .then(data => this.setState({tracks: data
        }))
    }

    render(){
        if(this.state.tracks!==""){
            console.log(this.state.tracks.items); //.tracksLink .track.album
            return(
                <div>
                    <AlbumCard token={this.props.token} musica={this.state.tracks.items[Math.floor(Math.random() * Object.keys(this.state.tracks.items).length)].track} /> {/*.tracksLink*/}
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
        
    }
}
export default AlbumSelect;