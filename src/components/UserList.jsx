import React from 'react'
import UserBox from './UserBox.jsx'
import AddUserForm from './AddUserForm.jsx'

export default class Base extends React.Component {

  constructor(){
    super();
  }

  render(){
    const users = this._getUsers();
    return (
      <div>
        <h1>User List</h1>
        <AddUserForm/>
        <div>
          {users}
        </div>
      </div>
    );
  }

  _getUsers(){
    return this.props.users.map((user) => {
      return <UserBox
                id={user.id}
                name={user.name}
                verified={user.verified}
                key={user.id + Math.floor(Math.random()*100)}/>
    });
  }
}
