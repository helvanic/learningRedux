import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import Base from './components/Base.jsx'
import UserList from './components/UserList.jsx'


import counterStore from './CounterStore'

document.getElementById('app').addEventListener('click', () => {
    counterStore.dispatch({type : 'INCREMENT'});
    console.log(counterStore.getState());
});
console.log(counterStore.getState());

//UserListStore
import userListStore from './UserListStore'

jQuery(function() {

  //Few ES2015 React components. Click on anything in the #app div to increase the counter
  ReactDOM.render(
    <Base />,
    document.getElementById('app')
  );

  //Created a few basics React components to build a UserList dynamically reflecting the app's state
  const renderUsers = () => {
    ReactDOM.render(
      <UserList users={userListStore.getState()}/>,
      document.getElementById('userList')
    );
  }

  renderUsers(); //For initial rendering
  userListStore.subscribe(renderUsers); // When the state change, renders again

});
