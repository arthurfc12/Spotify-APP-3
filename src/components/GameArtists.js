import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import { AiOutlineClose } from 'react-icons/ai';

class GameArtists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artista1: '',
			popularidade1: 0,
			artista2: '',
			popularidade2: 0,
			acertou: false,
			errou: false,
			refresh: true
		};

		this.handleFirstArtist = this.handleFirstArtist.bind(this);
		this.handleSecondArtist = this.handleSecondArtist.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	componentWillMount() {
		this.setState({
			acertou: false,
			errou: false
		});
		const requestOptions = {
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		};

		axios.get('https://api.spotify.com/v1/me/top/artists', requestOptions).then((response) => {
			var random1 = Math.floor(Math.random() * response.data.items.length);
			var random2 = Math.floor(Math.random() * response.data.items.length);

			while (response.data.items[random1].popularity === response.data.items[random2].popularity) {
				var random1 = Math.floor(Math.random() * response.data.items.length);
				var random2 = Math.floor(Math.random() * response.data.items.length);
			}
			this.setState({
				artista1: response.data.items[random1].name,
				popularidade1: response.data.items[random1].popularity,
				artista2: response.data.items[random2].name,
				popularidade2: response.data.items[random2].popularity
			});
			console.log(this.state.artista1);
			console.log(this.state.popularidade1);
			console.log(this.state.artista2);
			console.log(this.state.popularidade2);

			console.log(response.data);
		});
	}

	handleFirstArtist() {
		this.refs.btn1.setAttribute('disabled', 'disabled');
		this.refs.btn2.setAttribute('disabled', 'disabled');
		if (this.state.popularidade1 > this.state.popularidade2) {
			this.setState({
				acertou: true,
				errou: false
			});
		} else {
			this.setState({
				errou: true,
				acertou: false
			});
		}
	}

	handleSecondArtist() {
		this.refs.btn1.setAttribute('disabled', 'disabled');
		this.refs.btn2.setAttribute('disabled', 'disabled');
		if (this.state.popularidade2 > this.state.popularidade1) {
			this.setState({
				acertou: true
			});
		} else {
			this.setState({
				errou: true
			});
		}
	}
	handleRefresh() {
		window.location.reload(false);
		// this.forceUpdate();
		// console.log('entrou');
	}

	render() {
		return (
			<div className="container">
				<div>
					<h3 className="title"> Qual artista é mais famoso? </h3>
				</div>
				<div className="inRow">
					<button className="btn" ref="btn1" onClick={this.handleFirstArtist}>
						{' '}
						{this.state.artista1}
					</button>
					<div className="txt">
						{' '}
						<AiOutlineClose size={50} />{' '}
					</div>
					<button className="btn" ref="btn2" onClick={this.handleSecondArtist}>
						{' '}
						{this.state.artista2}
					</button>
				</div>
				<div className="Results">
					{this.state.acertou && (
						<div className="column">
							{' '}
							<div>Parabéns, você acertou!! </div>
							<div className="desc">
								{' '}
								{this.state.artista1} possui uma popularidade de {this.state.popularidade1}%{' '}
							</div>
							<div className="desc">
								{' '}
								{this.state.artista2} possui uma popularidade de {this.state.popularidade2}% {' '}
							</div>
							<button className="playAgain" onClick={this.handleRefresh}>
								{' '}
								<div> Ver outros Jogos</div>
							</button>
						</div>
					)}
					{this.state.errou && (
						<div className="column">
							{' '}
							<div> Que pena, você errou :( </div>
							<div className="desc">
								{' '}
								{this.state.artista1} possui uma popularidade de {this.state.popularidade1}%{' '}
							</div>
							<div className="desc">
								{this.state.artista2} possui uma popularidade de {this.state.popularidade2}%{' '}
							</div>
							<button className="playAgain" onClick={this.handleRefresh}>
								{' '}
								<div> Ver outros Jogos</div>
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default GameArtists;
