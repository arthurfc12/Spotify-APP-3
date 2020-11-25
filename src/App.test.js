import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Spotify App/i);
//   expect(linkElement).toBeInTheDocument();
// });

configure({ adapter: new Adapter() });

it('should render spotify app', () => {
  const app = shallow(<App />);
  // expect(app.find(App)).toHaveLength(1);
  expect(app.find('title').at(0).text()).toEqual('Spotify App');
});
