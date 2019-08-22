import React from 'react';
import './App.css';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import AppContext from './AppContext';
import { Route, Link } from 'react-router-dom';
import Note from './Note/Note';
import AddNoteForm from './AddNoteForm/AddNoteForm';
import MainList from './MainList/MainList';
import FolderNav from './FolderNav/FolderNav';
import RouteListError from './RouteListError/RouteListError';
import EditNoteForm from './EditNoteForm/EditNoteForm';
import config from './config';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
      folderToAdd: {}
    }
  }

  componentDidMount() {

    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/folders`),
      fetch(`${config.API_ENDPOINT}/api/notes`)
    ])
      .then(([folders, notes]) => {
        if (!folders.ok) {
          return folders.json().then(e => Promise.reject(e));
        }

        if (!notes.ok) {
          return notes.json().then(e => Promise.reject(e));
        }

        return Promise.all([
          folders.json(),
          notes.json()
        ]);
      })
      .then(([foldersJson, notesJson]) => {
        this.setState({
          folders: foldersJson,
          notes: notesJson
        });

      })
      .catch(error => {
        console.log(error);
      })

  }

  addFolder = (newFolder) => {

    fetch(`${config.API_ENDPOINT}/api/folders`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }

        return response.json();
      })
      .then(responseJson => {
        this.setState({
          folders: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });

    const newFolders = [...this.state.folders, newFolder]
    this.setState({
      folders: newFolders
    });

  }

  deleteNote = (note) => {

    fetch(`${config.API_ENDPOINT}/api/notes`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }

        return response.json();
      })
      .then(responseJson => {
        this.setState({
          notes: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addNote = (newNote) => {

    fetch(`${config.API_ENDPOINT}/api/notes`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }

        return response.json();
      })
      .then(responseJson => {
        this.setState({
          notes: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateNote = (editedNote) => {

    fetch(`${config.API_ENDPOINT}/api/notes`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }

        return response.json();
      })
      .then(responseJson => {
        this.setState({
          notes: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderAltRoutes() {

    const paths = ["/add-folder", "/add-note", "/edit/note/:noteId"];

    return paths.map((path, index) => {

      if (path === "/add-folder") {
        return <Route key={index} path={path} component={AddFolderForm} />
      }

      if (path === "/add-note") {
        return <Route key={index} path={path} component={AddNoteForm} />
      }

      if (path === "/edit/note/:noteId") {
        return <Route key={index} path={path} component={EditNoteForm} />
      }
    });
  }

  renderMainRoutes() {

    const paths = ["/", "/folder/:folderId", "/note/:noteId"];

    return paths.map((path, index) => {

      if (path === "/") {
        return <Route key={index} exact path={path} component={MainList} />
      }

      if (path === "/folder/:folderId") {
        return <Route key={index} path={path} render={routeProps => {
          const folderId = parseInt(routeProps.match.params.folderId);

          const selectedNotes = this.state.notes.filter(note => note.folder_id === folderId);

          return <FolderNav notes={selectedNotes} />;
        }} />
      }

      if (path === "/note/:noteId") {
        return <Route key={index} path={path} component={Note} />
      }
    });
  }



  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      updateNote: this.updateNote
    };

    return (
      <div>
        <header>
          <Link to="/" className="headerLink">
            <h1 >Noteful</h1>
          </Link>
        </header>
        <main>
          <RouteListError>
            <AppContext.Provider value={contextValue}>
              <section className="main">
                {this.renderMainRoutes()}
                {this.renderAltRoutes()}
              </section>
            </AppContext.Provider>
          </RouteListError>
        </main>
      </div>
    );
  }
}

export default App;
