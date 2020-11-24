import React from 'react';
import './App.css';
import MyPlaylist from './MyPlaylist';

class FetchRec extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendations: '',
			choosePlaylist: false
		};

		this.AddtoPlaylist = this.AddtoPlaylist.bind(this);
	}

	componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		};

		var acoustic = '';
		var dance = '';
		var energy = '';
		var liveness = '';

		if (this.props.acousticness < 0.15) {
			acoustic = '&min_acousticness=0&max_acousticness=' + String(this.props.acousticness + 0.15);
		} else if (this.props.acousticness > 0.85) {
			acoustic = '&min_acousticness=' + String(this.props.acousticness - 0.15) + '&max_acousticness=0';
		} else {
			acoustic =
				'&min_acousticness=' +
				String(this.props.acousticness - 0.15) +
				'&max_acousticness=' +
				String(this.props.acousticness + 0.15);
		}

		if (this.props.energy < 0.15) {
			energy = '&min_energy=0&max_energy=' + String(this.props.energy + 0.15);
		} else if (this.props.energy > 0.85) {
			energy = '&min_energy=' + String(this.props.energy - 0.15) + '&max_energy=0';
		} else {
			energy =
				'&min_energy=' + String(this.props.energy - 0.15) + '&max_energy=' + String(this.props.energy + 0.15);
		}

		if (this.props.liveness < 0.15) {
			liveness = '&min_liveness=0&max_liveness=' + String(this.props.liveness + 0.15);
		} else if (this.props.liveness > 0.85) {
			liveness = '&min_liveness=' + String(this.props.liveness - 0.15) + '&max_liveness=0';
		} else {
			liveness =
				'&min_liveness=' +
				String(this.props.liveness - 0.15) +
				'&max_liveness=' +
				String(this.props.liveness + 0.15);
		}

		if (this.props.danceability < 0.15) {
			dance = '&min_danceability=0&max_danceability=' + String(this.props.danceability + 0.15);
		} else if (this.props.danceability > 0.85) {
			dance = '&min_danceability=' + String(this.props.danceability - 0.15) + '&max_danceability=0';
		} else {
			dance =
				'&min_danceability=' +
				String(this.props.danceability - 0.15) +
				'&max_danceability=' +
				String(this.props.danceability + 0.15);
		}

		fetch(
			'https://api.spotify.com/v1/recommendations?seed_genres=' +
				this.props.seedGenres +
				acoustic +
				energy +
				dance +
				liveness,
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => this.setState({ recommendations: data }));
	}

	AddtoPlaylist(uri) {
		this.setState({
			choosePlaylist: true,
			music: uri
		});
	}

	render() {
		if (this.state.recommendations !== '') {
			const recArray = this.state.recommendations.tracks;
			var add = this.AddtoPlaylist;
			console.log(recArray);
			if (recArray.length !== 0) {
				if (this.state.choosePlaylist === false) {
					return (
						<div>
							{recArray.map(function(d, idx) {
								return (
									<div className="inRow">
										<li className="lista" key={idx}>
											<div className="namerec">
												{' '}
												{d.name} by {d.artists[0].name}{' '}
											</div>
										</li>
										<button
											className="addPlaylist"
											onClick={() => {
												add(d.uri);
											}}
										>
											{' '}
											Adicionar música à playlist
										</button>
									</div>
								);
							})}
						</div>
					);
				} else {
					return (
						<div>
							<MyPlaylist token={this.props.token} musicUri={this.state.music} />
						</div>
					);
				}
			} else {
				return (
					<div>
						<h3>Não foram encontradas recomendações</h3>
					</div>
				);
			}
		} else {
			return <div>Carregando</div>;
		}
	}
}
export default FetchRec;
