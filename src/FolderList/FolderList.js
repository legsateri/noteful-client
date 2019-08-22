import React from 'react';
import './FolderList.css';
import AppContext from '../AppContext';
import Folder from '../Folder/Folder';
import { Link } from 'react-router-dom';

class FolderList extends React.Component {

    static contextType = AppContext;

    render() {

        const folders = this.context.folders.map(folder => {

            const notes = this.context.notes.filter(note => note.folder_id === folder.id);
            const numNotes = notes.length.toString();
            return (
                <li key={folder.id} className="folderListItem">
                    <Folder
                        folderName={folder.folder_name}
                        folderId={parseInt(folder.id)}
                        numNotes={numNotes}
                    />
                </li>
            );
        });

        return (
            <section className="folderList">
                <ul>
                    {folders}
                </ul>
                <div className="btn-addFolder">
                    <Link to="/add-folder">
                        <button>Add Folder</button>
                    </Link>
                </div>
            </section>
        );
    }
}

export default FolderList;