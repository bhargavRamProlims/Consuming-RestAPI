import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {}
        };
    }

    deleteCompany(id) {
        console.log(id)
        Axios.delete('http://localhost:3001/api/companies/' + id)
            .then(result => {
                console.log('Company deleted with id: ' + id);
                this.props.history.push('/companies');
                window.location.reload();
            })
            .catch(error => console.log('there is some error: ', error))
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/api/companies/' + this.props.match.params.id)
            .then(result => {
                console.log(result);
                this.setState({ company: result.data});
                console.log(this.state.company);
            })
            .catch(error => console.log('there is some error: ', error))
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.company.name}
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Company Name</th>
                                    <td>{this.state.company.name}</td>
                                </tr>
                                <tr>
                                    <th>Company Street</th>
                                    <td>{this.state.company.street}</td>
                                </tr>
                                <tr>
                                    <th>Company Phone</th>
                                    <td>{this.state.company.phone}</td>
                                </tr>
                                <tr>
                                    <Link className='btn btn-info' to='/companies'>Back to List</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-danger' to={'/api/companies'+this.state.company._id} onClick={this.deleteCompany.bind(this,this.state.company._id)}>Delete</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-secondary' to={'/companies-edit/'+this.state.company._id}>Edit</Link>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}