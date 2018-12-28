import React, {Component} from 'react';
import * as api from './api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        // This is App.js's login function, which we'll call
        // to supply the app with userdata, and to refresh the page
        this.appLogin = props.login;
    }

    async login(e) {
        e.preventDefault(); // Prevents page refresh
        let user = await api.login(this.state);
        sessionStorage.setItem('token', user.auth);
        this.props.login(user.user);
    }
    
    async handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        const {username, password} = this.state;

        return (
            <div className="form-body">
                    <form onSubmit={this.login}>
                        <div className="form-field">
                            <TextField
                                id='username'
                                name='username'
                                type='text'
                                variant='outlined'
                                value={username}
                                label='Username'
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <TextField
                                id='password'
                                name='password'
                                type='password'
                                variant='outlined'
                                value={password}
                                label='Password'
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <Button 
                        type='submit' 
                        variant='contained' 
                        color='secondary'>Login</Button>
                    </form>  
                </div>
        )
    }
}

export default Login;