import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';
import toJson from 'enzyme-to-json';
import AlbumGame from '../components/AlbumGame.js';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should appear the name of the correct album', async () => {
    const data = {
      data: {
        props: [
          {
            musica: [{ name: 'Rock or Bust', album: { name: 'Rock or Bust'
            },
          },
        ],
      }]
      }}
    


    mockedAxios.get.mockResolvedValueOnce(data);
    const app = shallow(<AlbumGame />);
    // expect(app.find(App)).toHaveLength(1);
  
    expect(toJson(app)).toMatchSnapshot();

});