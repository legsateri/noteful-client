import React from 'react';
import ReactDOM from 'react-dom';
import NoteList from './NoteList';
import { BrowerRouter } from 'react-router-dom';

describe('NoteList component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowerRouter><NoteList /></BrowerRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});