import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
// 	render(<App />);
// 	const linkElement = screen.getByText('Spotify App');
// 	expect(linkElement).toBeInTheDocument();
// });

it('should render spotify app', () => {
	const app = shallow(<App />);
	// expect(app.find(App)).toHaveLength(1);
	expect(app.find('title').at(0).text()).toEqual('Spotify App');
});
