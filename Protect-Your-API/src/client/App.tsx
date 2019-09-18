import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/public/Home';
import AddBlog from './components/admin/AddBlog';
import ViewBlog from './components/public/ViewBlog';
import EditBlog from './components/admin/EditBlog';
import Login from './components/admin/Login';

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
                    <li><Link to={'/blog/add'} className="nav-link"> Admin </Link></li> 
                </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/blog/add' component={AddBlog} />
                    <Route exact path ='/blog/view/:id/:author' component={ViewBlog} />
                    <Route exact path='/blog/update/:id' component={EditBlog} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </div>        
            </Router>   
        )
    }
}

export default App;