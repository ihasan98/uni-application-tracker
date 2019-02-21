import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './UserForm.css';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            email: '',
            password: '',
            contact: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.addUser({...this.state});
        this.setState({
            username: '',
            fullname: '',
            email: '',
            password: '',
            contact: ''
        });
      }
    
      render() {
          const {username, fullname, email, password, contact} = this.state;

          return (
            <div>
                <Typography variant="display1" gutterBottom>
                    Add New User
                </Typography>
                <div className="form-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-field">
                            <TextField
                                id='username'
                                name='username'
                                type='text'
                                variant='outlined'
                                value={username}
                                label='Username'
                                onChange={this.handleChange}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="form-field">
                            <TextField
                                id='fullname'
                                name='fullname'
                                type='text'
                                variant='outlined'
                                value={fullname}
                                label='Full Name'
                                onChange={this.handleChange}
                                fullWidth
                                required
                            />
                        </div>

                        <div className="form-field">
                            <TextField
                                id='email'
                                name='email'
                                type='email'
                                variant='outlined'
                                value={email}
                                label='Email'
                                onChange={this.handleChange}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="form-field">
                            <TextField
                                id='contact'
                                name='contact'
                                type='text'
                                variant='outlined'
                                value={contact}
                                label='Contact(Num)'
                                onChange={this.handleChange}
                                fullWidth
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
                                fullWidth 
                                required
                            />
                        </div>
                        <Button 
                        type='submit' 
                        variant='contained' 
                        color='secondary' 
                        fullWidth>ADD</Button>
                    </form>  
                </div>
            </div>
          )
      }
}

export default UserForm;