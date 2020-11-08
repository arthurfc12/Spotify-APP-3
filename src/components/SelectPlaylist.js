import React from 'react';
import MusicCard from './MusicCard.js';

class SelectPlaylist extends React.Component {

    constructor(props){
        super(props)
        // console.log("SelectPlaylist")
        // console.log(props)
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
        // .items.map(item => { console.log(data.items)
        //     return {
        //         tracksLink:item
        //     }
        // })
    }

    render(){
        if(this.state.tracks!==""){
            // console.log(this.state.tracks[0].tracksLink.track.album);
            return(
                <div>
                    <MusicCard token={this.props.token} musica={this.state.tracks[Math.floor(Math.random() * Object.keys(this.state.tracks).length)].track} /> {/*.tracksLink*/}
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
        
    }
}
export default SelectPlaylist;