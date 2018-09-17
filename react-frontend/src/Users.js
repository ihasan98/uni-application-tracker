import React, {Component} from 'react';
import * as apiCalls from './api';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import UserItem from './UserItem';
import UserForm from './UserForm';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showForm: false
        }
        this.addUser = this.addUser.bind(this);
    }

    async addUser(user) {
        let newUser = await apiCalls.createUser(user);
        this.setState({users : [...this.state.users, newUser], showForm : false});
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
                <Grid container alignContent="center" justify="center">
                    <Grid item xs={12} md={6} alignContent="center" justify="center">
                        <Typography variant="display2" gutterBottom>
                            List of Users
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Student ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>   
                            </TableHead>
                            <TableBody>
                                {users}
                            </TableBody>
                        </Table>
                        <Button 
                        style={
                            {
                                margin : '0.8rem'
                            }
                        }
                        variant="contained" 
                        color="secondary" 
                        onClick={() => this.setState({showForm : true})}>
                        Add New User
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6} alignContent="center" justify="center">
                        {this.state.showForm ?
                            <UserForm
                            addUser={this.addUser}
                            />
                            : null
                        }
                    </Grid>
                </Grid>
             </div>
        )
    }
}

export default Users;