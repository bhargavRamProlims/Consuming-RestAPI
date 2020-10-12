import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class NotesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {}
        };
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

    componentDidMount() {
        Axios.get('http://localhost:3001/notes/' + this.props.match.params.id)
            .then(result => {
                this.setState({ note: result.data});
                console.log(this.state.note);
            })
            .catch(error => console.log('there is some error: ', error))
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.note.title}
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Notes Title</th>
                                    <td>{this.state.note.title}</td>
                                </tr>
                                <tr>
                                    <th>Notes Content</th>
                                    <td>{this.state.note.content}</td>
                                </tr>
                                <tr>
                                    <Link className='btn btn-info' to='/notes'>Back to List</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-danger' to={'/notes/'+this.state.note._id} onClick={this.deleteNote.bind(this,this.state.note._id)}>Delete</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-secondary' to={'/notes-edit/'+this.state.note._id}>Edit</Link>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}