import React, {Component} from 'react';

const UserItem = ({username, fullname, email, onDelete}) => (
    <tr>
        <td>{username}</td>
        <td>{fullname}</td>
        <td>{email}</td>
        <td> 
           <span onClick={onDelete}> X </span>
        </td>
	</tr>
)

export default UserItem;