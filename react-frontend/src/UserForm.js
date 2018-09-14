import React, {Component} from 'react';

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
                        <label htmlFor='username'>Username</label>
                        <input
                        id='username'
                        type='text'
                        placeholder=''
                        name='username'
                        value={username}
                        size={36}
                        autoComplete='off'
                        onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='fullname'>Full Name</label>
                        <input
                        id='fullname'
                        type='text'
                        placeholder=''
                        name='fullname'
                        value={fullname}
                        size={36}
                        autoComplete='off'
                        onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                        id='email'
                        type='email'
                        placeholder=''
                        name='email'
                        value={email}
                        size={36}
                        autoComplete='off'
                        onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='contact'>Contact(Num)</label>
                        <input
                        id='contact'
                        type='text'
                        placeholder=''
                        name='contact'
                        value={contact}
                        size={36}
                        autoComplete='off'
                        onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                        id='password'
                        type='password'
                        placeholder=''
                        name='password'
                        value={password}
                        size={36}
                        autoComplete='off'
                        onChange={this.handleChange} />
                    </div>
                    <button
                        type="submit"
                        style={{alignSelf: 'flex-end', marginRight: 0}}
                        >
                        ADD
                    </button>
                </form>  
              </div>
          )
      }
}

export default UserForm;