import React, { useState } from 'react';
import './App.css';
import SelectPlaylist from './SelectPlaylist.js';

class Game extends React.Component {

    constructor(props){
        super(props)
        this.state={
            loading: false,
            playlists: "",
            tracks: "",
        }
    }

    componentWillMount() {
        
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
          }
          
          fetch('https://api.spotify.com/v1/me/playlists', requestOptions)
              .then(response => response.json())
              .then(data => this.setState({playlists: data.items.map(item => { console.log(data.items)
                    return {
                      tracksLink:item,
                      loading: true
                  }
              })
          }))
          
        //   fetch(String(this.state.playlists[Math.floor(Math.random() * Object.keys(this.state.playlists).length)].tracksLink), requestOptions)
        //       .then(response => response.json())
        //       .then(data => this.setState({tracks: data.items.map(item => { console.log(data.items)
        //             return {
        //               tracksLink:item,
        //               loading: true
        //           }
        //       })
        //   }))

    }





        
    render(){

        // if(this.state.playlists !== ""){
        //     console.log("console");
        //     // console.log(this.state.playlists)
        //     // console.log(this.state.playlists[Math.floor(Math.random() * Object.keys(this.state.playlists).length)].tracksLink.tracks.href);
        // }

        // if(this.state.playlists != ""){
        //     console.log("console")
        //     console.log(this.state.tracks[0].tracksLink.track.album);
        // }


        if(this.state.playlists !== ""){
            return(
                <div>
                    <h1 className="titulos">Game</h1>
                    {
                        this.state.loading ? <h1>Carregando</h1> :
                        <div>
                            <SelectPlaylist playlistList = {this.state.playlists} token = {this.props.token}/>
                        </div>
                    }
                </div>
            );
        }
        else {
            return(
                <h1 className="titulos">Carregando</h1>
            );
        }
    }
}
export default Game;