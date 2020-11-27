import React from 'react';
import { render, wait, cleanup, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';
import MyPlaylist from '../components/MyPlaylist';
import { configure, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

afterEach(cleanup);

it('should render the playlists names on the buttons', async () => {
	const data = {
		data: {
			items: [
				{
					name: 'Pop songs',
					id: 1
				},
				{
					name: 'Rock songs',
					id: 2
				}
			]
		}
	};

	mockedAxios.get.mockResolvedValueOnce(data);
	const app = shallow(<MyPlaylist />);
	// expect(app.find(App)).toHaveLength(1);

	await waitFor(() => {
		// expect(mockedAxios.get).toHaveBeenCalledTimes(1);
		expect(app.find('button').at(0).text()).toEqual('Pop songs');
		expect(app.find('button').at(1).text()).toEqual('Rock songs');
	});
});

it('should render the playlists ', async () => {
	const data = {
		data: {
			items: [
				{
					name: 'Pop songs',
					id: 1
				},
				{
					name: 'Rock songs',
					id: 2
				}
			]
		}
	};

	mockedAxios.get.mockResolvedValueOnce(data);
	const app = mount(<MyPlaylist />);
	// expect(app.find(App)).toHaveLength(1);

	await waitFor(() => {
		expect(toJson(app)).toMatchSnapshot();
	});
});
