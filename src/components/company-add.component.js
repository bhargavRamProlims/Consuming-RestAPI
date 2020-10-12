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

export default class ComapanyAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            street: null,
            phone: null,
            formErrors: {
                name: "",
                street: "",
                phone: ""
            }
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (formvalid(this.state.formErrors)) {
            console.log('Valid form');
            const company = {
                name: this.state.name,
                street: this.state.street,
                phone: this.state.phone
            };
            Axios.post('http://localhost:3001/api/companies', company)
                .then(result => {
                    console.log('Successfully added a new company');
                    this.props.history.push('/companies');
                })
                .catch(error => console.log('there is some error: ', error))
        } else {
            console.log('form Invalid');
        }

    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name = value.length < 3 ? "Must be atleast 3 characters long" : "";
                break;
            case "street":
                formErrors.street = value.length < 5 ? "Must be atleast 5 characters long" : "";
                break;
            case "phone":
                formErrors.phone = value.length < 5 ? "Must be atleast 5 digits long" : "";
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
        console.log(this.state)
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <h3>Add  Comapany</h3>
                <form onSubmit={this.handleSubmit} noValidate >

                    <div className='form-group'>
                        <label>Comapny Name</label>
                        <input type="text"
                            className={`form-control ${formErrors.name.length > 0 ? 'is-invalid' : null}`}
                            name="name"
                            onChange={this.handleChange}
                            noValidate />
                        {formErrors.name.length > 0 && <span className='error text-danger'>{formErrors.name}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Company street</label>
                        <input type="text"
                            className={`form-control ${formErrors.street.length > 0 ? 'is-invalid' : null}`}
                            name="street"
                            onChange={this.handleChange}
                            noValidate />
                        {formErrors.street.length > 0 && <span className='error text-danger'>{formErrors.street}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Company Phone</label>
                        <input type="text"
                            className={`form-control ${formErrors.phone.length > 0 ? 'is-invalid' : null}`}
                            name="phone"
                            onChange={this.handleChange}
                            noValidate />
                        {formErrors.phone.length > 0 && <span className='error text-danger'>{formErrors.phone}</span>}
                    </div>
                    <button type="submit" className="btn btn-secondary">Add</button>
                    &nbsp;&nbsp;&nbsp;
                    <Link className='btn btn-info' to='/companies'>Back to List</Link>
                </form>
            </div>
        )
    }
}