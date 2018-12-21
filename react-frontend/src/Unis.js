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
import UniItem from './UniItem';

class Unis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unis: props.unis
        }
        this.logout = this.props.logout;
        this.addUni = this.addUni.bind(this);
    }

    async addUni(uni) {
        let newUnis = await apiCalls.createUni(uni);
        this.setState({unis : [...this.state.unis, newUnis]});
    }

    async deleteUni(id) {
        await apiCalls.removeUni(id);
        const unis = this.state.unis.filter(uni => uni._id !== id);
        this.setState({unis}); 
    }

    render() {
        const unis = this.state.unis.map(uni => (
            <UniItem
                key={uni._id}
                {...uni}
                onDelete={this.deleteUni.bind(this, uni._id)}
            />
        ));
        return (
            <div>
                <Grid container alignContent="center" justify="center">
                    <Grid item xs={12} md={6} alignContent="center" justify="center">
                        <Typography variant="display2" gutterBottom>
                            List of Universities
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>   
                            </TableHead>
                            <TableBody>
                                {unis}
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
                        Add New University
                        </Button>
                    </Grid>
                </Grid>
             </div>
        )
    }
}

export default Unis;