import React from 'react';
import { render, wait, cleanup, waitFor, getAllByDisplayValue, getByDisplayValue, getAllByTitle, getAllByTestId } from '@testing-library/react';
import mockedAxios from 'axios';
import SelectSongs from '../components/SelectSongs';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from "prop-types";
import '@testing-library/jest-dom/extend-expect';
configure({ adapter: new Adapter() });

it('should render alert screen box', async () => {

    const props = {
        SongsList: [{track: {name: "Rockstar", artists: [{name: "Post Malone"}]}}, {track: {name: "Rockstar", artists: [{name: "Post Malone"}]}}, {track: {name: "Rockstar", artists: [{name: "Post Malone"}]}}, {track: {name: "Rockstar", artists: [{name: "Post Malone"}]}}, {track: {name: "Rockstar", artists: [{name: "Post Malone"}]}}]
    }

    const { getByTestId ,getByText, getAllByText } = render(<SelectSongs {...props} />);

    mockedAxios.post.mockResolvedValueOnce(props);

    const app = mount(<SelectSongs {...props} />)
    expect(toJson(app)).toMatchSnapshot()


    //const data = {
       // data: {
            //items: [
                //{
                    //name: 'Post Malone'
                //}
            //],
        //},
    //};



    //const props = {
       // props: {
        //    items: [
        //        {
        //            name: 'Post Malone'
        //        }
        //    ]
    //    }
   // }

    const likeButton = getAllByText(/Gosto deste artista/i);
    expect(likeButton[0]).toBeInTheDocument();
    likeButton[0].click();

    await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    })

    //const artistInDb = getAllByTestId(/Artista_definido_como_'gostei'/i);
    global.alert = jest.fn();
    const artistInDb = jest.spyOn(window, 'alert');
    expect(global.alert).toHaveBeenCalled();

    const dislikeButton = getAllByText(/Não gosto deste artista/i);
    expect(dislikeButton[0]).toBeInTheDocument();
    dislikeButton[0].click();

    const artistNotInDb = getAllByText(/Artista_definido_como_'não gostei'/i);
    expect(artistNotInDb).toBeInTheDocument();
    
});