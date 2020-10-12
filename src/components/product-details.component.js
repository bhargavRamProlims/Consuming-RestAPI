import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        };
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

    componentDidMount() {
        Axios.get('http://localhost:3001/api/products/' + this.props.match.params.id)
            .then(result => {
                console.log(result);
                this.setState({ product: result.data});
                console.log(this.state.product);
            })
            .catch(error => console.log('there is some error: ', error))
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.product.name}
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Product Code</th>
                                    <td>{this.state.product.code}</td>
                                </tr>
                                <tr>
                                    <th>Product Name</th>
                                    <td>{this.state.product.name}</td>
                                </tr>
                                <tr>
                                    <th>Product details</th>
                                    <td>{this.state.product.details}</td>
                                </tr>
                                <tr>
                                    <th>Product Company</th>
                                    <td>{this.state.product.company ? this.state.product.company.name:""}</td>
                                </tr>
                                <tr>
                                    <Link className='btn btn-info' to='/products'>Back to List</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-danger' to={'/api/products'+this.state.product._id} onClick={this.deleteProduct.bind(this,this.state.product._id)}>Delete</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-secondary' to={'/products-edit/'+this.state.product._id}>Edit</Link>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}