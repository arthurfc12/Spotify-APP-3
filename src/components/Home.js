import React from 'react';
import Game from './Game';
import Recommendation from './Recommendation';
import './App.css';
import Log from './Log.js';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Helmet from 'react-helmet';
import GameArtists from './GameArtists';
import ArtistRelated from './ArtistRelated';
import GameArtist from './GameArtist';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const parametros = this.getHashParams();
    this.state = {
      token: '',
      refresh_token: '',
      page: 'game',
      drop: false,
      refresh: '',
      buttons: true,
    };
    if (this.state.token === '') {
      this.state.token = parametros.access_token;
      this.state.refresh_token = parametros.refresh_token;
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.refresh = this.refresh.bind(this);
    console.log(this.state);
    // const freshState = this.state;
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.state.token,
      },
    };
    console.log(this.props);
    fetch('https://api.spotify.com/v1/me', requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ userId: data }));
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  handleChange1() {
    if (this.state.page === 'game') {
      this.setState({
        page: 'refresh',
        refresh: 'game',
        buttons: true,
        guessTheDate: false,
        whichArtist: false,
        guessTheArtist: false,
        artistRelated: false,
      });
    } else {
      this.setState({ page: 'game', buttons: true });
    }
  }

  handleChange2() {
    if (this.state.page === 'recommendation') {
      this.setState({
        page: 'refresh',
        refresh: 'recommendation',
      });
    } else {
      this.setState({ page: 'recommendation' });
    }
  }

  handleChange3() {
    if (this.state.page === 'log') {
      this.setState({
        page: 'refresh',
        refresh: 'log',
      });
    } else {
      this.setState({ page: 'log' });
    }
  }

  handleClose() {
    this.setState({ drop: false });
  }

  handleOpen() {
    this.setState({ drop: true });
  }

  refresh() {
    this.setState({ page: this.state.refresh });
  }

  render() {
    if (this.state.page === 'game') {
      return (
        <div className='gridContainer'>
          <Helmet>
            <title>Spotify App</title>
          </Helmet>
          <div className='barra1' />
          <div className='barra2'>
            <div className='bGroup'>
              <ButtonGroup
                variant='contained'
                color='primary'
                aria-label='contained primary button group'
              >
                <Button onClick={this.handleChange1}>Game</Button>
                <Button onClick={this.handleChange2}>Recomendação</Button>
                <Button onClick={this.handleChange3}>Histórico</Button>
              </ButtonGroup>
              <div>
                {this.state.buttons && (
                  <div>
                    <h1 style={{ color: '#FFFF', marginTop: 50 }}>
                      {' '}
                      Escolha seu Game!{' '}
                    </h1>
                    <div className='columnHome'>
                      <button
                        className='gameOpt'
                        onClick={() => {
                          this.setState({ whichArtist: true, buttons: false });
                        }}
                      >
                        {' '}
                        Qual artista é mais famoso?{' '}
                      </button>
                      <button
                        className='gameOpt'
                        onClick={() => {
                          this.setState({ guessTheDate: true, buttons: false });
                        }}
                      >
                        {' '}
                        Acerte a data de lançamento da música!{' '}
                      </button>
                      <button
                        className='gameOpt'
                        onClick={() => {
                          this.setState({
                            guessTheArtist: true,
                            buttons: false,
                          });
                        }}
                      >
                        {' '}
                        Acerte o Artista da música!{' '}
                      </button>
                      <button
                        className='gameOpt'
                        onClick={() => {
                          this.setState({
                            artistRelated: true,
                            buttons: false,
                          });
                        }}
                      >
                        {' '}
                        Busque artistas relacionados{' '}
                      </button>
                    </div>
                  </div>
                )}
                {this.state.whichArtist && (
                  <GameArtists token={this.state.token} />
                )}
                {this.state.guessTheDate && <Game token={this.state.token} />}
                {this.state.guessTheArtist && (
                  <GameArtist token={this.state.token} />
                )}
                {this.state.artistRelated && (
                  <ArtistRelated
                    id={this.state.userId}
                    token={this.state.token}
                  />
                )}
              </div>
            </div>
          </div>
          <div className='barra3' />
        </div>
      );
    } else if (this.state.page === 'recommendation') {
      return (
        <div className='gridContainer'>
          <Helmet>
            <title>Spotify App</title>
          </Helmet>
          <div className='barra1' />
          <div className='barra2'>
            <div className='bGroup'>
              <ButtonGroup
                variant='contained'
                color='primary'
                aria-label='contained primary button group'
              >
                <Button onClick={this.handleChange1}>Game</Button>
                <Button onClick={this.handleChange2}>Recomendação</Button>
                <Button onClick={this.handleChange3}>Histórico</Button>
              </ButtonGroup>
              <Recommendation token={this.state.token} />
            </div>
          </div>
          <div className='barra3' />
        </div>
      );
    } else if (this.state.page === 'log') {
      console.log(this.state.userId.id);
      return (
        <div className='gridContainer'>
          <Helmet>
            <title>Spotify App</title>
          </Helmet>
          <div className='barra1' />
          <div className='barra2'>
            <div className='bGroup'>
              <ButtonGroup
                variant='contained'
                color='primary'
                aria-label='contained primary button group'
              >
                <Button onClick={this.handleChange1}>Game</Button>
                <Button onClick={this.handleChange2}>Recomendação</Button>
                <Button onClick={this.handleChange3}>Histórico</Button>
              </ButtonGroup>
              <Log id={this.state.userId.id} token={this.state.token} />
            </div>
          </div>
          <div className='barra3' />
        </div>
      );
    } else {
      console.log(this.state.page);
      this.refresh();
      return <div className='screen'>Carregando</div>;
    }
  }
}

export default Home;
