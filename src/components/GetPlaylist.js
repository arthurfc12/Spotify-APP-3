import React from "react";
import PlaylistFeatures from "./PlaylistFeatures.js";
import axios from "axios";

class GetPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      playlists: [],
    };
    //this.fetchPlaylist = this.fetchPlaylist.bind(this)
  }

  componentWillMount() {
    const requestOptions = {
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    };

    //${this.state.userID}
    //this.setState({userID: localStorage.getItem("UserID")})

    const user = localStorage.getItem("UserID");

    axios
      .get(`https://api.spotify.com/v1/users/${user}/playlists`, requestOptions)
      .then((response) => {
        console.log(response.data.items);
        //console.log(this.state.userID)

        this.setState({ playlists: response.data.items }, () => {
          console.log(this.state);
        });
      });
  }

  // fetchPlaylist(){
  //     const pointToThis = this;
  //     const user = localStorage.getItem("UserID")
  //     let API_SPOTIFY = `https://api.spotify.com/v1/users/${user}/playlists`;
  //     let namefetch = [];
  //     let imagefetch = [];

  //     fetch (API_SPOTIFY)
  //     .then(
  //         function(response){
  //             return response.json();
  //         }
  //     )
  //     .then(
  //         function(data){
  //             // for(var key in data['Object'][key]['items']){
  //                 // namefetch.push(data['Object'][key]['items']['name']);
  //                 // imagefetch.push(data['Object'][key]['items']['images']['url']);

  //         // }

  //         var listagem = data.items;
  //         listagem.map((music)=>{
  //             console.log(music.name)
  //             console.log(music.images[0].url)
  //         })

  //         //console.log(imagefetch)
  //         //console.log(namefetch)

  //         pointToThis.setState({
  //             names: namefetch,
  //             images: imagefetch
  //         });
  //     }
  //   )
  // }

  render() {
    return (
      <div>
        <h1 className="titulos">Playlists</h1>
        <ul>
          {this.state.playlists.map((music) => {
            return (
              <li>
                <p className="titulos">{music.name}</p>
                <img src={music.images[0].url}></img>
              </li>
              //console.log('name',music.name)
              //console.log('image',music.images[0].url)
              //console.log(music)
            );
          })}
        </ul>
      </div>
    );
  }
}
export default GetPlaylist;
