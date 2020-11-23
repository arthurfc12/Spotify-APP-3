import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ArtistRelated(props) {
  const [topArtists, setTopArtist] = useState('');
  const [ArtistRelatedList, setArtistRelatedList] = useState('');

  useEffect(() => {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + props.token,
      },
    };
    axios
      .get('https://api.spotify.com/v1/me/top/artists', requestOptions)
      .then((response) => {
        setTopArtist(response.data);
      });
  }, []);

  console.log('topArtists:', topArtists);

  // axios
  //   .get(
  //     'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/related-artists',
  //     requestOptions
  //   )
  //   .then((response) => console.log('related-artists:', response.data));

  //   axios
  //     .get('https://api.spotify.com/v1/me/top/artists', requestOptions)
  //     .then((response) => {
  //       this.setState({ topArtists: response.data });
  //       console.log('topArtists:', this.state.topArtists);
  //     });

  return (
    <div style={{ display: 'flex', color: '#ffffff', flexDirection: 'column' }}>
      {topArtists.items !== undefined &&
        Object.values(topArtists.items).map((item, key) => {
          return (
            <Link
              // onCLick={console.log('funcinou!')}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <div
                key={key}
                style={{
                  backgroundColor: '#222222',
                  height: '10rem',
                  width: '90%',
                  boxShadow: '0 0 10px #000000',
                  margin: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: '1rem',
                }}
              >
                <div>
                  <p style={{ fontSize: '1.5rem' }}>{item.name}</p>
                  <p style={{ fontSize: '1.2rem' }}>
                    {item.followers.total} followers
                  </p>
                </div>
                <img
                  style={{ height: '8rem', borderRadius: '50%' }}
                  src={Object.values(item.images)[2].url}
                />
              </div>
            </Link>
          );
        })}
    </div>
  );
}
