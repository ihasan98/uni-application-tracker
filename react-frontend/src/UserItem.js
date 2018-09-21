import React, {Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './Users.css';

const UserItem = ({username, fullname, onDelete}) => (
    <TableRow className="user-item">
       <TableCell>{username}</TableCell>
       <TableCell>{fullname}</TableCell>
       <TableCell>
        <IconButton aria-label="Delete">
            <span onClick={onDelete}><DeleteIcon /></span>
        </IconButton>
        </TableCell> 
    </TableRow>
)

export default UserItem;