import React from 'react';
import ReactDOM from 'react-dom';
import AddFolderForm from './AddFolderForm';

// describe test suite
describe('AddFolderForm component', () => {

    // use jest it() to test component 
    it('renders without crashing', () => {
        // declare test html element
        const div = document.createElement('div');
        // run test
        ReactDOM.render(<AddFolderForm />, div);
        // clear test 
        ReactDOM.unmountComponentAtNode(div);
    });
});
