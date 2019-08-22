import React from 'react';
import ReactDOM from 'react-dom';
import FolderList from './FolderList';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe("FolderList component", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><FolderList /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it.skip('renders a list of folders by default', () => {
        const wrapper = shallow(<FolderList />);
        const wrapperJson = toJson(wrapper);
        expect(wrapperJson).toMatchSnapshot();
    });
});