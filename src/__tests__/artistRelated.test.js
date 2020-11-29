import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import ArtistRelated from '../components/ArtistRelated';
import { configure, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import mockedAxios from 'axios';

configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should show artist related', async () => {
  const data = {
    artistSelected: '7185Q95lPFld0aoPqO6e0U',
    ArtistRelatedList: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/50nVKm0xa3p8KYXXssG2ym',
        },
        followers: { href: null, total: 7744 },
        genres: ['chillhop', 'lo-fi beats'],
        href: 'https://api.spotify.com/v1/artists/50nVKm0xa3p8KYXXssG2ym',
        id: '50nVKm0xa3p8KYXXssG2ym',
        images: [
          {
            height: 640,
            url:
              'https://i.scdn.co/image/a9dd952cbaa9bddf0fe03432b10be8780de2838d',
            width: 640,
          },
          {
            height: 320,
            url:
              'https://i.scdn.co/image/3494cb26cf678a71433484c9dff86618065fcac1',
            width: 320,
          },
          {
            height: 160,
            url:
              'https://i.scdn.co/image/d1ae2cac2332450a1c77a822390b40de8f38a715',
            width: 160,
          },
        ],
        name: 'Monma',
        popularity: 63,
        type: 'artist',
        uri: 'spotify:artist:50nVKm0xa3p8KYXXssG2ym',
      },
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/4C7NcNb9V6lakzMGHQlm8i',
        },
        followers: { href: null, total: 5299 },
        genres: ['lo-fi beats'],
        href: 'https://api.spotify.com/v1/artists/4C7NcNb9V6lakzMGHQlm8i',
        id: '4C7NcNb9V6lakzMGHQlm8i',
        images: [
          {
            height: 640,
            url:
              'https://i.scdn.co/image/b0aaba50c1bba08b36a7d0206d7e98628a5619a3',
            width: 640,
          },
          {
            height: 320,
            url:
              'https://i.scdn.co/image/0b29093fa3a5e26f8e3a6b2be23f65e50b230cf7',
            width: 320,
          },
          {
            height: 160,
            url:
              'https://i.scdn.co/image/31088f40bfd925cd87998db8b02b2d2208248373',
            width: 160,
          },
        ],
        name: 'Tom Doolie',
        popularity: 65,
        type: 'artist',
        uri: 'spotify:artist:4C7NcNb9V6lakzMGHQlm8i',
      },
    ],
  };

  mockedAxios.get.mockResolvedValueOnce(data);
  const app = shallow(<ArtistRelated />);

  // expect(mockedAxios.get).toHaveBeenCalledTimes(1);

  // expect(['7185Q95lPFld0aoPqO6e0U']).toContain(app.find('id').at(0).text());
  // await waitFor(() => {
  // });

  expect(toJson(app)).toMatchSnapshot();
});
