import React from 'react';
import './MainList.css';
import NoteList from '../NoteList/NoteList';
import FolderList from '../FolderList/FolderList';

export default function MainList(props) {

    return (
        <section className="mainList">
            <FolderList />
            <NoteList />
        </section>
    );
}