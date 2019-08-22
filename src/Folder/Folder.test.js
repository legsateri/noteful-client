import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './Folder';
import { BrowserRouter } from 'react-router-dom';

describe('Folder component', () => {
    it('renders without crashing', () => {

        const test = 'test';
        const testId = "testId"
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><Folder folderName={test} folderId={testId}/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});