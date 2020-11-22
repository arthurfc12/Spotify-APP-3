import React from 'react';
// import MusicCard from './MusicCard.js';

class SelectSongs extends React.Component {
  constructor(props) {
    super(props);
    // console.log("SelectPlaylist")
    // console.log(props)
    this.state = {
      SongsList: '',
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
      },
    };
    // var sorteio = Math.floor(Math.random() * Object.keys(this.props.playlistList).length);
    // fetch(String(this.props.playlistList[sorteio].tracks.href), requestOptions) //.tracksLink
    //     .then(response => response.json())
    //     .then(data => this.setState({tracks: data
    // }))
  }

  render() {
    console.log('this.state.SongsList:', this.state.SongsList);
    console.log('this.props.SongsList:', this.props.SongsList);
    if (this.state.SongsList !== '') {
      console.log('this.state.SongsList.items', this.state.SongsList.items);
      return (
        <div>
          <p>
            Música: {this.props.SongsList.name} por{' '}
            {this.props.SongsList.artists}
          </p>
          {/* <p>Música: {this.props.musica[1].name} por {this.props.musica.artists[1].name}</p>
                    <p>Música: {this.props.musica[2].name} por {this.props.musica.artists[2].name}</p>
                    <p>Música: {this.props.musica[3].name} por {this.props.musica.artists[3].name}</p>
                    <p>Música: {this.props.musica[4].name} por {this.props.musica.artists[4].name}</p> */}
        </div>
      );
    } else {
      return <div>Não foi</div>;
    }
  }
}
export default SelectSongs;
