import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function ArtistRelated(props) {
  const requestOptions = {
    headers: {
      Authorization: 'Bearer ' + props.token,
    },
  };
  const [topArtists, setTopArtist] = useState('');
  const [artistSelected, setArtistSelected] = useState('');
  const [ArtistRelatedList, setArtistRelatedList] = useState([]);
  const [vizualization, setVizualization] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/me/top/artists', requestOptions)
      .then((response) => {
        setTopArtist(response.data);
      });
  }, []);

  function getArtistList(artistId) {
    console.log('artistId:', artistId);
    axios
      .get(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        requestOptions
      )
      .then((response) => {
        console.log(
          'related-artists:',
          JSON.stringify(response.data.artists.slice(0, 2))
        );
        setArtistRelatedList(response.data.artists.slice(0, 2));
      });
  }

  return !vizualization ? (
    <div style={{ display: 'flex', color: '#ffffff', flexDirection: 'column' }}>
      <p style={{ textAlign: 'left', fontSize: '1.6rem', fontWeight: '900' }}>
        Artistas Relacionados
      </p>
      <p style={{ textAlign: 'center', fontSize: '1.3rem' }}>
        Selecione um artista para ver os artistas relacionados:
      </p>
      {topArtists.items !== undefined &&
        Object.values(topArtists.items)?.map((item, key) => {
          return (
            <>
              <button
                className='gameOpt'
                key={`${key}-${item.id}`}
                onClick={() => {
                  console.log('oi');
                  getArtistList(item.id);
                  setArtistSelected(item.name);
                  setVizualization(true);
                }}
                style={{
                  height: 'fit-content',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <div
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
              </button>
            </>
          );
        })}
    </div>
  ) : (
    <div style={{ display: 'flex', color: '#ffffff', flexDirection: 'column' }}>
      <Button
        className='gameOpt'
        style={{
          width: 'fit-content',
          padding: '0.1rem 2rem',
          fontSize: '1rem',
          backgroundColor: 'transparent',
          color: '#ffffff',
          fontWeight: '900',
          borderRadius: '10rem',
          margin: '2rem 0rem',
        }}
        onClick={() => {
          setVizualization(false);
        }}
      >
        Voltar
      </Button>
      <p style={{ textAlign: 'left', fontSize: '1.6rem', fontWeight: '900' }}>
        Artistas relacionados a {artistSelected} :
      </p>
      {ArtistRelatedList !== undefined &&
        ArtistRelatedList?.map((item, key) => {
          return (
            <>
              <div
                key={`${key}-${item.id}`}
                style={{
                  backgroundColor: '#222222',
                  height: '10rem',
                  width: '90%',

                  margin: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: '1rem',
                  color: '#ffffff',
                }}
              >
                <div>
                  <p style={{ fontSize: '1.5rem' }}>{item.name}</p>
                  <p style={{ fontSize: '1.2rem' }}>
                    {item.followers.total} followers
                  </p>
                </div>
                <img
                  style={{ height: '8rem', width: '8rem', borderRadius: '50%' }}
                  src={Object.values(item.images)[2].url}
                />
              </div>
            </>
          );
        })}
    </div>
  );
}
