import React, { Component } from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import config from '../config';

export default class Note extends Component {

    static contextType = AppContext;

    handleClickDelete() {

        const noteId = this.props.match.params.noteId;
        const note = this.context.notes.find(note => note.id === noteId);

        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => Promise.reject(error))
                }

                return response.json();
            })
            .then(responseJson => {

                this.props.history.push("/");
                this.context.deleteNote(note);
            })
            .catch(error => {
                this.props.history.push("/");
                this.context.deleteNote(note);
            });

    }

    render() {
        const noteId = parseInt(this.props.match.params.noteId);
        const note = this.context.notes.find(note => note.id === noteId);
        const folder = this.context.folders.find(folder => folder.id === parseInt(note.folder_id));
        return (
            <section className="noteAlign">
                <button
                    className="btn-noteBack"
                    onClick={() => this.props.history.push("/")}>Back</button>
                <div className="noteContainer">
                    <Link to={`/note/${note.id}`} className="noteLink">
                        <h2>{note.note_name}</h2>
                    </Link>
                    <br />
                    Modified: {note.date_modified}
                    <br />
                    Folder: {folder.folder_name}
                    <br />
                    <div className="contentContainer">
                        <p className="noteContent">{note.content}</p>
                    </div>
                    <Link to={`/edit/note/${note.id}`}>
                        <button
                            className="btn-noteDelete"
                        >Update</button>
                    </Link>
                    <button
                        className="btn-noteDelete"
                        onClick={() => this.handleClickDelete()}>Remove</button>
                </div>
            </section>
        );
    }
}