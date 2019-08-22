import React from 'react';
import ReactDOM from 'react-dom';
import FolderNav from './FolderNav';
import { BrowserRouter } from 'react-router-dom';

describe('FolderNav component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><FolderNav /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
