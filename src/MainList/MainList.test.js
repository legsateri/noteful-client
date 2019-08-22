import React from 'react';
import ReactDOM from 'react-dom';
import MainList from './MainList';
import { BrowserRouter } from 'react-router-dom';

describe('MainList component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><MainList /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
