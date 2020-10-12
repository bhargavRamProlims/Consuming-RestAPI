import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    deleteProduct(id) {
        console.log(id)
        Axios.delete('http://localhost:3001/api/products/' + id)
            .then(result => {
                console.log('Product deleted with id: ' + id);
                this.props.history.push('/products');
            })
            .catch(error => console.log('there is some error: ', error))
    }

    getProducts() {
        Axios.get(`http://localhost:3001/api/products/`)
            .then(result => {
                const ProductList = result.data;
                this.setState({ products: ProductList });
                console.log(this.state.products);
            })
            .catch(error => console.log('there is some error ', error))
    }


    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <div>
                <h3>Product Component</h3>
                <br />
                <Link to="/products-add/" className="btn btn-info">Add a Product</Link>
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Details</th>
                            <th scope="col">Company</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue._id}</td>
                                    <td>{listValue.code}</td>
                                    <td>{listValue.name}</td>
                                    <td>{listValue.details}</td>
                                    <td>{listValue.company ? listValue.company.name:""}</td>
                                    <td>
                                        <Link to={'/products-details/' + listValue._id}>Details</Link>
                                    &nbsp;&nbsp;
                                    <Link to={'/products-edit/' + listValue._id}>Edit</Link>
                                    &nbsp;&nbsp;
                                    <Link to={'/api/products/' + listValue._id} onClick={this.deleteProduct.bind(this, listValue._id)}>Delete</Link>
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