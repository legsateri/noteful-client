import React from 'react';
import './FolderNav.css';
import FolderList from '../FolderList/FolderList';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';
import config from '../config';

class FolderNav extends React.Component {

    static contextType = AppContext;

    handleClickDelete(noteId) {

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

                this.context.deleteNote(note);
            })
            .catch(error => {
                this.context.deleteNote(note);
            });
    }

    renderSelectedNotes() {
        const notes = this.props.notes.map(note => {
            return (
                <li key={note.id} className="noteListItem">
                    <div>
                        <Link to={`/note/${note.id}`} className="noteListItemPath">
                            <h2>{note.note_name}</h2>
                        </Link>
                        <p>
                            Modified: {note.date_modified} <br />
                        </p>
                    </div>
                    <button
                        onClick={() => this.handleClickDelete(note.id)}
                        className="btn-deleteCompactNote"
                    >Remove</button>
                </li>
            );
        });

        return notes;
    }

    render() {
        return (
            <section className="selectedFolderList">
                <FolderList />
                <ul>
                    {this.renderSelectedNotes()}
                    <div className="btn-addNote">
                        <Link to="/add-note">
                            <button>Add Note</button>
                        </Link>
                    </div>
                </ul>
            </section>
        );
    }
}

FolderNav.propTypes = {
    notes: PropTypes.array.isRequired
}

export default FolderNav;
