import React from 'react'
import User from './User.jsx'
import Form from './Form.jsx'

export default class Base extends React.Component {

  constructor(){
    super();

    this.state = {
      users : [{id : 1, name :"Victor"},{id : 2, name: "Max"},{id : 3, name : "Nicolas"}]
    }
  }

  render(){
    const users = this._getUsers();
    return (
      <div onClick={this.props.handleClick}>
        <h1>Base Test</h1>
        <div className="user-list">
          {users}
        </div>
        {/*<Form handleChange={this._handleFormChange.bind(this)}/>*/}
        <p>{this.props.counter}</p>
      </div>
    );
  }

  _getUsers(){
    return this.state.users.map((user) => {
      return <User
                id={user.id}
                name={user.name}
                key={user.id}/>
    });
  }

  _handleFormChange(value){
    this.setState({
      text : value
    });
  }
}
