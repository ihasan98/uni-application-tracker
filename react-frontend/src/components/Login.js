import React, {Component} from 'react';
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
    }

    async login(e) {
        e.preventDefault(); // Prevents page refresh
        this.props.onAuth(this.state)
        .then((user) => {
            if (user.isAdmin) {
                this.props.history.push("/users")
            } else {
                this.props.history.push("/unis")
            }
        })
        .catch(() => {
            return;
        });
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