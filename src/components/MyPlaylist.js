import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class MyPlaylist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlists: ''
		};
		this.handlePost = this.handlePost.bind(this);
	}

	componentWillMount() {
		const requestOptions = {
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		};
		axios.get('https://api.spotify.com/v1/me/playlists', requestOptions).then((response) => {
			this.setState({ playlists: response.data.items });
			console.log(response.data.items);
		});
	}

	handlePost(id) {
		console.log(this.props.token);

		const data = {
			uris: [ this.props.musicUri ]
		};

		const headers = {
			Authorization: 'Bearer ' + this.props.token,
			Accept: 'application/json'
		};

		// console.log('aquiii', `https://api.spotify.com/v1/playlists/${id}/tracks`);
		// console.log('AQUIIIIII', `https://api.spotify.com/v1/playlists/${id}/tracks`, data, { headers: headers });

		axios
			.post(`https://api.spotify.com/v1/playlists/${id}/tracks`, data, {
				headers: headers
			})
			.then((response) => {
				// this.setState({ playlists: response.data.items });
				console.log(response.data);
				alert('Música adicionada com sucesso!');
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error.response.data);
				alert('Você não pode adicionar em uma playlist que não é sua :(');
			});
	}
	render() {
		const playlists = this.state.playlists;
		var post = this.handlePost;
		return (
			<div>
				<h4>Escolha sua playlist</h4>

				{this.state.playlists !== '' ? (
					playlists.map((playlist, idx) => {
						return (
							<div key={idx}>
								<button
									onClick={() => {
										post(playlist.id);
									}}
									className="gameOpt"
									key={idx}
								>
									<div className="btntext">{playlist.name}</div>
								</button>
							</div>
						);
					})
				) : (
					<div> Carregando</div>
				)}
			</div>
		);
	}
}

export default MyPlaylist;
