import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';
import toJson from 'enzyme-to-json';
import GameArtists from '../components/GameArtists';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should render the artists names on the buttons', async () => {
  const data = {
    data: {
      items: [
        {
          name: 'The Lumineers',
          popularity: 81,
        },
        {
          name: 'John Mayer',
          popularity: 84,
        },
      ],
    },
  };

  mockedAxios.get.mockResolvedValueOnce(data);
  const app = shallow(<GameArtists />);
  // expect(app.find(App)).toHaveLength(1);

  await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    expect([' The Lumineers', ' John Mayer']).toContain(
      app.find('button').at(0).text()
    );
    expect([' The Lumineers', ' John Mayer']).toContain(
      app.find('button').at(1).text()
    );
  });
});
afterEach(cleanup);

it("should render 'which artist is more famous?' game", () => {
  const data = {
    data: {
      items: [
        {
          name: 'The Lumineers',
          popularity: 81,
        },
        {
          name: 'John Mayer',
          popularity: 84,
        },
      ],
    },
  };

  mockedAxios.get.mockResolvedValueOnce(data);
  const app = mount(<GameArtists />);
  // expect(app.find(App)).toHaveLength(1);

  expect(toJson(app)).toMatchSnapshot();
  // await waitFor(() => {
  // });
});
