import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/public/Home';
import AddBlog from './components/admin/AddBlog';
import ViewBlog from './components/public/ViewBlog';
import EditBlog from './components/admin/EditBlog';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import { User } from './utils/api'; 

class App extends React.Component {
    render() {
        return (
            <Router>
            <div className="nav-container router">
                <nav className="navbar navbar-expand-sm navbar-light bg-warning font-weight-bold">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className="nav-link"> Blog </Link></li>             
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li><Link to={'/'} className="nav-link"> Blogs </Link></li>
                    {this.showAdmin()}   
                    {this.showLog()}                                 
                </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/blog/add' component={AddBlog} />
                    <Route exact path ='/blog/view/:id/:author' component={ViewBlog} />
                    <Route exact path='/blog/update/:id' component={EditBlog} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </div>        
            </Router>   
        )
    }

    showAdmin = () => {
        if (User.role === "admin") return (<li><Link to={'/blog/add'} className="nav-link"> Add Blog </Link></li>);
    }

    showLog = () => {
        if (User.userid == null) 
            return (<li><Link to={'/login'} className="nav-link"> Login </Link></li>);
        else {
            return (<button className="btn" type="submit"
            onClick={this.logout}>Logout</button>);
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }
}

export default App;