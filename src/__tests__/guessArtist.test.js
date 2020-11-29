import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import mockedFetch from 'fetch';
import toJson from 'enzyme-to-json';
import GameArtist from '../components/GameArtist';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistCard from '../components/ArtistCard';
configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should appear the name of the music', async () => {
    const data = {
      props: {
        album: [
          {
            name: 'How You Like That',
            artists: [
                {name: 'BLACKPINK'}
            ],
          },
        ],
      },
    };
  
    mockedFetch.get.mockResolvedValueOnce(data);
    const app = shallow(<GameArtist />);
  
    expect(toJson(app)).toMatchSnapshot();
    // await waitFor(() => {
    // });
  });
  