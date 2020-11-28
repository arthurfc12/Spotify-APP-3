import { Button, ButtonGroup, colors } from '@material-ui/core';
import React from 'react';
import "./App.css";

//const express = require('express')

class SelectSongs extends React.Component {
	constructor(props) {
		super(props);
		// console.log("SelectPlaylist")
		// console.log(props)
		this.state = {
			SongsList: ''
		};
	}

	handleChange(index) {
		alert("Artista definido como 'gostei'" )

		const names = {
			art : [this.props.SongsList[index].track.artists[0].name]
		}

		axios.post('http://localhost:5000/likes', names)
		
	}

	handleChange2() {
		alert("Artista definido como 'não gostei'")
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
		this.state.variable = true
		this.state.variable = false

		if (this.props.SongsList !== '') {
			console.log('this.state.SongsList.items: ENTROUUU', this.state.SongsList.items);

			return (
				<div>

					<ul className = "songs">
						<li>
							{this.props.SongsList[0].track.name} por {this.props.SongsList[0].track.artists[0].name}
							<ButtonGroup
							>
							<Button onClick={this.handleChange(0)} style={{color: '#4CAF50'}}>Gosto deste artista</Button>
							<Button onClick={this.handleChange2} style={{color: '#F50110'}}>Não gosto deste artista</Button>
							</ButtonGroup>
						</li>
						<hr class="solid"></hr>
						<li>
							{this.props.SongsList[1].track.name} por {this.props.SongsList[1].track.artists[0].name}
							<ButtonGroup
							>
							<Button onClick={this.handleChange(1)} style={{color: '#4CAF50'}}>Gosto deste artista</Button>
							<Button onClick={this.handleChange2} style={{color: '#F50110'}}>Não gosto deste artista</Button>
							</ButtonGroup>
						</li>
						<hr class="solid"></hr>
						<li>
							{this.props.SongsList[2].track.name} por {this.props.SongsList[2].track.artists[0].name}
							<ButtonGroup
							>
							<Button onClick={this.handleChange(2)} style={{color: '#4CAF50'}}>Gosto deste artista</Button>
							<Button onClick={this.handleChange2} style={{color: '#F50110'}}>Não gosto deste artista</Button>
							</ButtonGroup>
						</li>
						<hr class="solid"></hr>
						<li>
							{this.props.SongsList[3].track.name} por {this.props.SongsList[3].track.artists[0].name}
							<ButtonGroup
							>
							<Button onClick={this.handleChange(3)} style={{color: '#4CAF50'}}>Gosto deste artista</Button>
							<Button onClick={this.handleChange2} style={{color: '#F50110'}}>Não gosto deste artista</Button>
							</ButtonGroup>
						</li>
						<hr class="solid"></hr>
						<li>
							{this.props.SongsList[4].track.name} por {this.props.SongsList[4].track.artists[0].name}
							<ButtonGroup
							>
							<Button onClick={this.handleChange(4)} style={{color: '#4CAF50'}}>Gosto deste artista</Button>
							<Button onClick={this.handleChange2} style={{color: '#F50110'}}>Não gosto deste artista</Button>
							</ButtonGroup>
						</li>
					</ul>
				</div>
			);
		} else {
			return <div>Não foi</div>;
		}
	}
}
export default SelectSongs;
