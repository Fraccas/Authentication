import * as React from 'react';
import { json, SetAccessToken } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleLoginSubmit = async() => {
        if (this.state.email && this.state.password) {
            try {
                let result = await json('/auth/login', 'POST', {
                    email: this.state.email,
                    password: this.state.password
                });

                if (result) {
                    SetAccessToken(result.token, { userid: result.userid, role: result.role });
                    if (result.role === 'admin') {
                        this.props.history.push('/blog/add');
                    } else {
                        this.props.history.push('/');
                    }
                } else {
                    // check login status
                }
            } catch(e) {
                throw e;
            }
        } else {
            alert('Please enter email and password!');
        }
    }

    render () {
        return (
            <div className="card m-4 p-3 shadow">
                <div className="card-body">
                    <h5 className="m-3">Email
                    <input type="text" className="form-control" placeholder='email...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}></input>
                    </h5>

                    <h5 className="m-3">Password
                    <input type="password" className="form-control" placeholder='password...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}></input>
                    </h5>

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.handleLoginSubmit}>Login</button>
                </div>
            </div>
        );
    }
}

export interface ILoginProps extends RouteComponentProps { }

export interface ILoginState {
    email: string, 
    password: string
}


