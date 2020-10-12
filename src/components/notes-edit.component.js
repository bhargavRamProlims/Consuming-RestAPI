import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const formvalid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    return valid;
}

export default class EditNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            formErrors: {
                title: "",
                content: ""
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "title":
                formErrors.title = value.length < 3 ? "Must be atleast 3 characters long" : "";
                break;
            case "content":
                formErrors.content = value.length < 5 ? "Must be atleast 5 characters long" : "";
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (formvalid(this.state.formErrors)) {
            console.log('Valid form');
            const note = {
                id: this.props.match.params.id,
                title: this.state.title,
                content: this.state.content
            };
            Axios.put('http://localhost:3001/notes/' + note.id, note)
                .then(result => {
                    console.log('Successfully Updated existing node');
                    this.props.history.push('/notes');
                })
                .catch(error => console.log('there is some error: ', error))
        } else {
            console.log('form Invalid');
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/notes/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    note: result.data,
                    title: result.data.title,
                    content: result.data.content,
                    formErrors: {
                        title: '',
                        content: ''
                    }
                });
                console.log(this.state.note);
            })
            .catch(error => console.log('there is some error: ', error))
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <h3>Edit  Note</h3>
                <form onSubmit={this.handleSubmit} noValidate >
                    <div className='form-group'>
                        <label>Note Title</label>
                        <input type="text"
                            className={`form-control ${formErrors.title.length > 0 ? 'is-invalid' : null}`}
                            name="title"
                            value={this.state.title || ''}
                            onChange={this.handleChange}
                            noValidate />
                        {formErrors.title.length > 0 && <span className='error text-danger'>{formErrors.title}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Note Content</label>
                        <input type="text"
                            className={`form-control ${formErrors.content.length > 0 ? 'is-invalid' : null}`}
                            name="content"
                            value={this.state.content || ''}
                            onChange={this.handleChange}
                            noValidate />
                        {formErrors.content.length > 0 && <span className='error text-danger'>{formErrors.content}</span>}
                    </div>
                    <button type="submit" className="btn btn-secondary">Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <Link className='btn btn-info' to='/notes'>Back to List</Link>
                </form>
            </div>
        )
    }
}