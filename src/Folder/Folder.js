import React from 'react';
import './Folder.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Folder(props) {

    return (
        <section className="folderListItem">
            <Link to={`/folder/${props.folderId}`} className="folderLink">
                <h2 className="folderName">{props.folderName}</h2>
                <div className="numNotes">{props.numNotes}</div>
            </Link>
        </section>
    );
}

Folder.propTypes = {
    folderId: PropTypes.number.isRequired,
    numNotes: PropTypes.string.isRequired
}