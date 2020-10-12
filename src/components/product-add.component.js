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

export default class ProductAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null,
            name: null,
            details: null,
            company: null,
            formErrors: {
                code: "",
                name: "",
                details: ""
            },
            companies: []
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (formvalid(this.state.formErrors)) {
            console.log('Valid form');
            const product = {
                code: this.state.code,
                name: this.state.name,
                details: this.state.details,
                company: this.state.company
            };
            Axios.post('http://localhost:3001/api/products', product)
                .then(result => {
                    console.log('Successfully added a new product');
                    this.props.history.push('/products');
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
            case "code":
                formErrors.code = value.length < 3 ? "Must be atleast 3 characters long" : "";
                break;
            case "name":
                formErrors.name = value.length < 5 ? "Must be atleast 3 characters long" : "";
                break;
            case "details":
                formErrors.details = value.length < 5 ? "Must be atleast 5 characters long" : "";
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
        console.log(this.state)
    }

    // getCompany() {

    // }

    componentDidMount() {
        // this.getCompany();
        Axios.get('http://localhost:3001/api/companies/')
            .then(result => {
                const CompanyList = result.data;
                this.setState({ companies: CompanyList })
                console.log(result.data)
            })
            .catch(error => console.log('there is some error ', error))
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <h3>Add  Product</h3>
                <form onSubmit={this.handleSubmit} >

                    <div className='form-group'>
                        <label>Product Code</label>
                        <input required type="text"
                            className={`form-control ${formErrors.code.length > 0 ? 'is-invalid' : null}`}
                            name="code"
                            onChange={this.handleChange} />
                        {formErrors.code.length > 0 && <span className='error text-danger'>{formErrors.code}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Product Name</label>
                        <input required type="text"
                            className={`form-control ${formErrors.name.length > 0 ? 'is-invalid' : null}`}
                            name="name"
                            onChange={this.handleChange} />
                        {formErrors.name.length > 0 && <span className='error text-danger'>{formErrors.name}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Product Details</label>
                        <input required type="text"
                            className={`form-control ${formErrors.details.length > 0 ? 'is-invalid' : null}`}
                            name="details"
                            onChange={this.handleChange} />
                        {formErrors.details.length > 0 && <span className='error text-danger'>{formErrors.details}</span>}
                    </div>
                    <div className="form-group">
                        <label>Product Company</label> &nbsp;
                        <select required className="dropdown" placeholder="Available Plans"
                            onChange={(e) => {
                                this.setState({ company: e.target.value }, () => {
                                    console.log(this.state.company)
                                })
                            }}>
                                <option selected></option>
                            {this.state.companies.map((value) => {return <option value={value._id}>{value.name}</option> })}
                        </select>
                    </div>
                    <br/><br/>
                    <button type="submit" className="btn btn-secondary">Add</button>
                    &nbsp;&nbsp;&nbsp;
                    <Link className='btn btn-info' to='/products'>Back to List</Link>
                </form>
            </div>
        )
    }
}