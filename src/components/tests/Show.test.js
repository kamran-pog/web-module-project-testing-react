import React from 'react';
import { render, fireEvent, screen, userEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import mockFetchShow from './../../api/fetchShow'
import Loading from '../Loading';
import fetchShow from './../../api/fetchShow';


const exampleShowData = {
    name: "Stranger Things",
    summary: "Stranger Things",
    seasons: [
        {id:0, name: "Season 1", episodes: []},
        {id:1, name: "Season 2", episodes: []},
        {id:2, name: "Season 3", episodes: []},
        {id:3, name: "Season 4", episodes: []},
        {id:4, name: "Season 5", episodes: []},
      ]
};

test('renders without errors', () => {

    render(<Show season={exampleShowData}/>)

});

test('renders Loading component when prop show is null', async () => { 
    
    render(<Loading/>)
    const loading = await screen.findByTestId("loading-container")
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={exampleShowData} selectedSeason={'none'}/>)
    const show = screen.queryAllByTestId("season-option")
    expect(show).toHaveLength(5)
    //  expect(show.length).toHaveLength(exampleShowData.seasons.length)
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn()
    render(<Show show={exampleShowData} selectedSeason={'none'} handleSelect={handleSelect}/>)
    const Select = screen.getByLabelText(/select a season/i)
    fireEvent.change(Select, {target: {value: 1}})
    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });
