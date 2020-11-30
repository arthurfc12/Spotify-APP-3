import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import mockedFetch from 'fetch';
import toJson from 'enzyme-to-json';
import GameMusic from '../components/GameMusic';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should appear the name of the correct Music', async () => {
    const data = {
      props: {
        album: [
          {
            name: 'Who Says',
            artists: [
                {name: 'Selena Gomez & The Scene'}
            ],
          },
        ],
      },
    };
  
    mockedFetch.get.mockResolvedValueOnce(data);
    const app = shallow(<GameMusic />);
  
    expect(toJson(app)).toMatchSnapshot();
    // await waitFor(() => {
    // });
  });
  