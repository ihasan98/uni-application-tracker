import React, {Component} from 'react';
import * as apiCalls from './api';
import UserItem from './UserItem';
import UserForm from './UserForm';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
    }

    async addUser(user) {
        let newUser = await apiCalls.createUser(user);
        this.setState({users : [...this.state.users, newUser]});
    }

    async deleteUser(id) {
        await apiCalls.removeUser(id);
        const users = this.state.users.filter(user => user._id !== id);
        this.setState({users}); 
    }

    componentWillMount() {
        this.loadUsers();
    }

    async loadUsers() {
        let users = await apiCalls.getUsers();
        this.setState({users});
    }

    render() {
        const users = this.state.users.map(user => (
            <UserItem
                key={user._id}
                {...user}
                onDelete={this.deleteUser.bind(this, user._id)}
            />
        ));
        return (
            <div>
                <h1>List of Users</h1>
                <UserForm
                    addUser={this.addUser}
                />
                <p>Click on the student ID to view their page.</p>
                <table>
		            <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>    
		            </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users;