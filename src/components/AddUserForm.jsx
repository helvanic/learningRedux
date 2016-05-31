import React from 'react';
import Input from './Input.jsx';
import userListStore from '../UserListStore';

export default class AddUserForm extends React.Component {
  constructor(){
    super();

    this.state = {
      valid : false,
      text : ""
    }
  }

  render(){
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <Input type="text"
               onChange={this._handleInputChange.bind(this)}/>
        <input type="submit" value="Add User"></input>
      </form>
    )
  }

  _handleSubmit(event){
    event.preventDefault();
    if(this.state.valid){
      userListStore.dispatch({
        type : 'ADD_USER',
        id : Math.floor(Math.random()*100000000000),
        name : this.state.text
      });
    }
  }

  _handleInputChange(e){
    //Checking if data is present. If not, set Form state.valid to false
    this.setState({text : e.target.value})
    if(e.target.value==null || e.target.value === undefined || e.target.value==""){
      this.setState({valid :false});
    }else{
      this.setState({valid : true});
    }
  }

}
