import React, { Component } from "react";
import { BrowserRouter as Router, Link , Switch, Route } from "react-router-dom";
import ComapanyAdd from "./company-add.component";
import CompanyDetail from "./company-details.component";
import CompanyEdit from "./company-edit.components";
import Companies from "./company.component";
import NotesAdd from "./notes-add.component";
import NotesDetail from "./notes-detail.component";
import EditNote from "./notes-edit.component";
import Notes from "./notes.component";
import ProductAdd from "./product-add.component";
import ProductDetail from "./product-details.component";
import ProductEdit from "./product-edit.component";
import Products from "./product.component";
import User from "./User";


const home = () => {
    return (
        <div>
            <h3>Welcome to home page</h3>
            <h5>The user data is taken from <a href="http://jsonplaceholder.typicode.com/users">Json Placeholder</a></h5>
        </div>
    )
}

class Main extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to={'/'} className="navbar-brand">Admin Portal</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/users'} className="nav-link">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/notes'} className="nav-link">Notes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/companies'} className="nav-link">Companies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/products'} className="nav-link">Products</Link>
                                </li>
                            </ul>
                        </div>
                    </nav> <br />
                    <Switch>
                        <Route path="/" exact component={home} />
                        <Route path="/users" component={User} />
                        <Route path="/notes/add" component={NotesAdd} />
                        <Route path="/notes-detail/:id" component={NotesDetail}/>
                        <Route path="/notes-edit/:id" component={EditNote}/>
                        <Route path="/notes" component={Notes} />
                        <Route path="/companies/" component={Companies} />
                        <Route path="/companies-add/" component={ComapanyAdd}/>
                        <Route path="/companies-details/:id" component={CompanyDetail}/>
                        <Route path="/companies-edit/:id" component={CompanyEdit}/>
                        <Route path="/products/" component={Products} />
                        <Route path="/products-add/" component={ProductAdd}/>
                        <Route path="/products-details/:id" component={ProductDetail}/>
                        <Route path="/products-edit/:id" component={ProductEdit}/>
                        
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Main;