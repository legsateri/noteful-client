import React from 'react';
import ReactDOM from 'react-dom';
import AddNoteForm from './AddNoteForm';

describe('AddNoteForm component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddNoteForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
