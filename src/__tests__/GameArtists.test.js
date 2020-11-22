import React from 'react';
import GameArtists from '../components/GameArtists';
import Home from '../components/Home';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it("should render 'which artist is more famous?' game", () => {
	const app = mount(<GameArtists />);
	expect(toJson(app)).toMatchSnapshot();
});
