import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            id='username'
                            name='username'
                            type='text'
                            variant='outlined'
                            value={username}
                            label='Username'
                            onChange={this.handleChange}
                            margin='normal'
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            id='fullname'
                            name='fullname'
                            type='text'
                            variant='outlined'
                            value={fullname}
                            label='Full Name'
                            onChange={this.handleChange}
                            margin='normal'
                            required
                        />
                    </div>

                    <div>
                        <TextField
                            id='email'
                            name='email'
                            type='text'
                            variant='outlined'
                            value={email}
                            label='Email'
                            onChange={this.handleChange}
                            margin='normal'
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            id='contact'
                            name='contact'
                            type='text'
                            variant='outlined'
                            value={contact}
                            label='Contact(Num)'
                            onChange={this.handleChange}
                            margin='normal'
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            variant='outlined'
                            value={password}
                            label='Password'
                            onChange={this.handleChange}
                            margin='normal'
                            required
                        />
                    </div>
                    <Button fullWidth variant='contained' color='primary'>ADD</Button>
                </form>  
              </div>
          )
      }
}

export default UserForm;