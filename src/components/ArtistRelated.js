import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

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
    <>
      {Object.values(topArtists.items).map((item, key) => {
        <div key={key}>
          <p>{item.name}</p>
        </div>;
      })}
    </>
  );
}
