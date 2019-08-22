import React from 'react';
import './EditNoteForm.css';
import AppContext from '../AppContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class EditNoteForm extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            note: {
                id: null,
                name: '',
                textArea: '',
                option: '',
                nameValid: false,
                contentValid: false,
                optionValid: false,
                formValid: false,
                validationMessageName: '',
                validationMessageContent: '',
                validationMessageOption: ''
            }
        }
    }

    componentDidMount() {
        const noteId = this.props.match.params.noteId;

        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => Promise.reject(error))
                }

                return response.json();
            })
            .then(responseJson => {
                const folder = this.context.folders.find(folder => folder.id === responseJson.folder_id);
                this.setState({
                    note: {
                        id: responseJson.id,
                        name: responseJson.note_name,
                        textArea: responseJson.content,
                        option: folder.folder_name
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSubmitNote(event) {

        const folder = this.context.folders.find(folder => folder.folder_name === this.state.note.option);
        const date = new Date();
        event.preventDefault();
        const newNote = {
            content: this.state.note.textArea,
            folder_id: folder.id,
            id: this.state.note.id,
            date_modified: date.toString(),
            note_name: this.state.note.name,

        };
        fetch(`${config.API_ENDPOINT}/api/notes/${newNote.id}`, {
            method: 'PATCH',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => Promise.reject(error))
                }

                return response.json();
            })
            .then(responseJson => {
                this.context.updateNote(newNote);
                this.props.history.push('/');
            })
            .catch(error => {
                this.props.history.push('/');
                this.context.updateNote(newNote)
            });
    }

    handleChangeNoteName(event) {
        const input = event.target.value;

        const hasError = this.validateName(input).hasError;
        const inputError = this.validateName(input).inputError;

        this.setState({
            note: {
                id: this.state.note.id,
                name: input,
                textArea: this.state.note.textArea,
                option: this.state.note.option,
                nameValid: !hasError,
                contentValid: this.state.note.contentValid,
                optionValid: this.state.note.optionValid,
                formValid: false,
                validationMessageName: inputError,
                validationMessageContent: this.state.note.validationMessageContent,
                validationMessageOption: this.state.note.validationMessageOption
            }
        });

        this.validateForm();

    }

    handleChangeTextArea(event) {
        const input = event.target.value;

        const hasError = this.validateTextArea(input).hasError;
        const inputError = this.validateTextArea(input).inputError;

        this.setState({
            note: {
                id: this.state.note.id,
                name: this.state.note.name,
                textArea: input,
                option: this.state.note.option,
                nameValid: this.state.note.nameValid,
                contentValid: !hasError,
                optionValid: this.state.note.optionValid,
                formValid: false,
                validationMessageName: this.state.note.validationMessageName,
                validationMessageContent: inputError,
                validationMessageOption: this.state.note.validationMessageOption
            }
        });

        this.validateForm();
    }

    handleSelectOption(option) {

        const hasError = this.validateOption(option).hasError;
        const inputError = this.validateOption(option).inputError;

        this.setState({
            note: {
                id: this.state.note.id,
                name: this.state.note.name,
                textArea: this.state.note.textArea,
                option: option,
                nameValid: this.state.note.nameValid,
                contentValid: this.state.note.contentValid,
                optionValid: !hasError,
                validationMessageName: this.state.note.validationMessageName,
                validationMessageContent: this.state.note.validationMessageContent,
                validationMessageOption: inputError
            }
        });

        this.validateForm();
    }

    validateName(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();
        if (inputValue.length === 0) {
            inputError = "Name is required";
            hasError = true;
        } else {
            if (inputValue.length < 3) {
                inputError = 'Name must be at least 4 characters long';
                hasError = true;
            } else {
                inputError = '';
                hasError = false;
            }
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;

    }

    validateTextArea(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();

        if (inputValue.length === 0) {
            inputError = "Text is required";
            hasError = true;
        } else {
            if (inputValue.length < 8) {
                inputError = 'Text must be at least 10 characters long';
                hasError = true;
            } else {
                inputError = '';
                hasError = false;
            }
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;
    }

    validateOption(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();
        if (inputValue.length < 3) {
            inputError = "Please select a folder";
            hasError = true;
        } else {
            inputError = '';
            hasError = false;
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;
    }

    validateForm() {

        const name = this.state.note.nameValid;
        const content = this.state.note.contentValid;

        if (name && content) {
            this.setState({
                formValid: true
            });
        }
    }


    render() {
        return (
            <section className="addNoteSection">
                <h2>Edit note</h2>
                <div className="addNoteForm">
                    <button
                        onClick={() => this.props.history.goBack()}
                    >Back</button>
                    <form
                        onSubmit={event => this.handleSubmitNote(event)}>
                        <label className="inputLabel" htmlFor="name">Name</label>
                        <br />
                        <input
                            className="inputField"
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.note.name}
                            onChange={event => this.handleChangeNoteName(event)}
                        />
                        <ValidationError
                            hasError={!this.state.note.nameValid}
                            message={this.state.note.validationMessageName}
                        />
                        <br />
                        <label className="inputLabel" htmlFor="content">Content</label>
                        <br />
                        <textarea
                            className="inputField"
                            value={this.state.note.textArea}
                            onChange={event => this.handleChangeTextArea(event)} />
                        <ValidationError
                            hasError={!this.state.note.contentValid}
                            message={this.state.note.validationMessageContent}
                        />
                        <br />
                        <label className="inputLabel" htmlFor="options">Folder</label>
                        <br />
                        <select
                            className="inputField"
                            id="options"
                            name="options"
                            value={this.state.note.option}
                            required
                            onChange={event => this.handleSelectOption(event.target.value)}
                        >
                            <option key={0} value="">{" "}</option>
                            {this.context.folders.map((folder, index) => (
                                <option key={index + 1} value={folder.folder_name}>{folder.folder_name}</option>
                            ))}
                        </select>
                        <br />
                        <button
                            className="btn-noteFormSubmit"
                            type="submit"
                        >Edit Note</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default EditNoteForm;