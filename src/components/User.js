import axios from 'axios';
import React, { Component } from 'react';

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    getUser() {
        axios.get(`http://jsonplaceholder.typicode.com/users`)
            .then(result => {
                const userList = result.data;
                this.setState({ users: userList });
                console.log(this.state.users);
            })
            .catch(error => console.log('there is some error ', error))
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <h3>User Component</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">User Id</th>
                            <th scope="col">User Name</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue.id}</td>
                                    <td>{listValue.name}</td>
                                    <td>{listValue.email}</td>
                                    <td>{listValue.phone}</td>
                                    <td>{listValue.website}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}