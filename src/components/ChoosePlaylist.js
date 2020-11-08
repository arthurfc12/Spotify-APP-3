import React from 'react';
import PlaylistFeatures from './PlaylistFeatures.js';

class ChoosePlaylist extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            musicsIdList:"",
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
        // console.log(this.props)
        // console.log((this.props.playlistList).length)
        // console.log(Object.keys(this.props.playlistList).length)
        // console.log(Object.keys(this.props.playlistList))
        var sorteio = Math.floor(Math.random() * Object.keys(this.props.playlistList).length);
        // console.log(sorteio)
        fetch(String(this.props.playlistList[sorteio].tracks.href), requestOptions) //.tracksLink
            .then(response => response.json())
            .then(data => this.setState({tracks: data
        }))
        // .items.map(item => { console.log(data.items)
        //     return {
        //         tracksList:item
        //     }
        // })
    }

    render(){
        if(this.state.tracks!==""){
            // console.log(this.state.tracks)
            return(
                <div className="titulos">
                    <PlaylistFeatures tracksList={this.state.tracks} token={this.props.token}/>
                </div>
            );
        } else {
            return(
                <div className="titulos">Carregando</div>
            );
        }
    }
}
export default ChoosePlaylist;