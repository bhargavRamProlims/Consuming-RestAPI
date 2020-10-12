import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    deleteNote(id) {
        console.log(id)
        Axios.delete('http://localhost:3001/notes/' + id)
            .then(result => {
                console.log('Note deleted with id: ' + id);
                this.props.history.push('/notes');
                window.location.reload();
            })
            .catch(error => console.log('there is some error: ', error))
    }

    getNotes() {
        Axios.get(`http://localhost:3001/notes`)
            .then(result => {
                const NotesList = result.data;
                this.setState({ notes: NotesList });
                console.log(this.state.notes);
            })
            .catch(error => console.log('there is some error ', error))
    }

    componentDidMount() {
        this.getNotes();
    }

    render() {
        return (
            <div>
                <h3>Notes Component</h3>
                <br />
                <Link to="notes/add" className="btn btn-info">Add a Node</Link>
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.notes.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue._id}</td>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.content}</td>
                                    <td>
                                        <Link to={'/notes-detail/' + listValue._id}>Details</Link>
                                    &nbsp;&nbsp;
                                    <Link to={'/notes-edit/' + listValue._id}>Edit</Link>
                                    &nbsp;&nbsp;
                                    <Link to={'/notes/' + listValue._id} onClick={this.deleteNote.bind(this, listValue._id)}>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}