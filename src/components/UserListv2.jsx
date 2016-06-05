import React from 'react'
import UserBox from './UserBox.jsx'
import AddUserForm from './AddUserForm.jsx'

export default class UserList2 extends React.Component {

  componentDidMount(){
    const { store } = this.props;
    this._unsubscribe = store.subscribe( () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount(){
    this._unsubscribe();
  }

  render(){
    const props = this.props;
    const { store } = props; // Gets store.props (ES6)
    const state = store.getState();
    const users = this._getUsers(state);
    const buttonValue = this._getButtonValue(state.visibilityFilter);
    return (
      <div>
        <h1>User List</h1>
        <AddUserForm addUser={this._addUser.bind(this)}/>
        <button onClick = {this._setVisibilityFilter.bind(this)}>{buttonValue}</button>
        <div>
          {users}
        </div>
      </div>
    );
  }

  _buildUser(user){
      return  <UserBox
                id={user.id}
                name={user.name}
                verified={user.verified}
                key={user.id + Math.floor(Math.random()*100)}
                verify = {this._verifyUser.bind(this)}
                remove = {this._removeUser.bind(this)}/>
  }

  _addUser(name){
    this.props.store.dispatch({
      type : 'ADD_USER',
      id : Math.floor(Math.random()*100000000000),
      name : name
    });
  };

  _verifyUser(id){
    this.props.store.dispatch({
      type : 'VERIFY_USER',
      id : id
    });
  };

  _removeUser(id){
    this.props.store.dispatch({
      type : 'REMOVE_USER',
      id : id
    });
  };

  _setVisibilityFilter(){
    const visibilityFilter = this.props.store.getState().visibilityFilter;
    if(visibilityFilter === 'SHOW_VERIFIED_ONLY'){
      this.props.store.dispatch({
        type : 'SET_VISIBILITY_FILTER',
        filter : 'SHOW_ALL'}
      );
    }else{
      this.props.store.dispatch({
        type : 'SET_VISIBILITY_FILTER',
        filter : 'SHOW_VERIFIED_ONLY'}
      );
    }
  }

  _getUsers(state){
    switch(state.visibilityFilter){
      case 'SHOW_VERIFIED_ONLY':
        return state.users
                   .filter(user => user.verified)
                   .map(user => {
                     return this._buildUser(user);
                   });
      case 'SHOW_ALL':
        return state.users.map((user) => {
          return this._buildUser(user);
        });
      default :
        return state.users.map((user) => {
          return this._buildUser(user);
        });
    }
  }

  _getButtonValue(visibilityFilter){
    if(visibilityFilter === 'SHOW_ALL'){
      return 'Verified Only';
    }else{
      return 'Show All';
    }
  }
}
