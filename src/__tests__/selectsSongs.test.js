import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import mockedFetch from 'fetch';
import toJson from 'enzyme-to-json';
import Songs from '../components/Songs';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectSongs from '../components/SelectSongs';
configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should appear the name of the music', async () => {
    const data = {
      props: {
        track: [
          {
            name: 'How You Like That', //nome da última música que a pessoa ouviu 
            artists: [
                {name: 'BLACKPINK'} //de quem é essa última música que a pessoa ouviu 
            ],
          },
        ],
      },
    };
  
    mockedFetch.get.mockResolvedValueOnce(data);
    const app = shallow(<Songs />);
  
    expect(toJson(app)).toMatchSnapshot();
    // await waitFor(() => {
    // });
  });
  