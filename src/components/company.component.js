import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Companies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
    }

    deleteCompany(id) {
        console.log(id)
        Axios.delete('http://localhost:3001/api/companies/' + id)
            .then(result => {
                console.log('Company deleted with id: ' + id);
                this.props.history.push('/companies');
            })
            .catch(error => console.log('there is some error: ', error))
    }

    getCompanies() {
        Axios.get(`http://localhost:3001/api/companies/`)
            .then(result => {
                const CompanyList = result.data;
                this.setState({ companies: CompanyList });
                console.log(this.state.companies);
            })
            .catch(error => console.log('there is some error ', error))
    }

    componentDidMount() {
        this.getCompanies();
    }

    render() {
        return (
            <div>
                <h3>Company Component</h3>
                <br />
                <Link to="/companies-add/" className="btn btn-info">Add a Company</Link>
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Street</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue._id}</td>
                                    <td>{listValue.name}</td>
                                    <td>{listValue.street}</td>
                                    <td>{listValue.phone}</td>
                                    <td>
                                        <Link to={'/companies-details/' + listValue._id}>Details</Link>
                                    &nbsp;&nbsp;
                                    <Link to={'/companies-edit/' + listValue._id}>Edit</Link>
                                    &nbsp;&nbsp; 
                                    <Link to={'/api/companies/' + listValue._id} onClick={this.deleteCompany.bind(this, listValue._id)}>Delete</Link>
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