import React from 'react';
import "./App.css";

class SelectSongs extends React.Component {
	constructor(props) {
		super(props);
		// console.log("SelectPlaylist")
		// console.log(props)
		this.state = {
			SongsList: ''
		};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		};
		// var sorteio = Math.floor(Math.random() * Object.keys(this.props.playlistList).length);
		// fetch(String(this.props.playlistList[sorteio].tracks.href), requestOptions) //.tracksLink
		//     .then(response => response.json())
		//     .then(data => this.setState({tracks: data
		// }))
	}

	render() {
		console.log('this.state.SongsList:', this.state.SongsList);
		console.log('this.props.SongsList: ALOOOOOOOOO', this.props.SongsList[0].track.name);
		if (this.props.SongsList !== '') {
			console.log('this.state.SongsList.items: ENTROUUU', this.state.SongsList.items);
			return (
				<div>
					<p>
						{this.props.SongsList[0].track.name} por {this.props.SongsList[0].track.artists[0].name}
					</p>
					<p>
						{this.props.SongsList[1].track.name} por {this.props.SongsList[1].track.artists[0].name}
					</p>
					<p>
						{this.props.SongsList[2].track.name} por {this.props.SongsList[2].track.artists[0].name}
					</p>
					<p>
						{this.props.SongsList[3].track.name} por {this.props.SongsList[3].track.artists[0].name}
					</p>
					<p>
						{this.props.SongsList[4].track.name} por {this.props.SongsList[4].track.artists[0].name}
					</p>
				</div>
			);
		} else {
			return <div>Não foi</div>;
		}
	}
}
export default SelectSongs;
