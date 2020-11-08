import React, { useState } from 'react';
import ChoosePlaylist from "./ChoosePlaylist";

class Recommendation extends React.Component {

    constructor(props){
        super(props)
        this.state={
            loading: false,
            playlists: "",
            tracks: ""
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
              .then(data => this.setState({playlists: data.items
          }))

    //       .items.map(item => { console.log(data.items)
    //         return {
    //           tracksLink:item
    //       }
    //   })
    }

    refresh() {
        this.forceUpdate()
    }

    render(){
        if(this.state.playlists != ""){
            return(
                <div>
                    <h1 className="titulos">Recomendação</h1>
                    {
                        this.state.loading ? <h1>Carregando</h1> :
                        <div>
                            <ChoosePlaylist playlistList = {this.state.playlists} token = {this.props.token}/>
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
export default Recommendation;