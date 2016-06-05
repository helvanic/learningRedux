import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import Base from './components/Base.jsx'
// import UserList from './components/UserList.jsx'
import UserList2 from './components/UserListv2.jsx'

//Stores
import counterStore from './CounterStore'
// import userListStore from './UserListStore'
import userListStore2 from './UserListStorev2'

jQuery(function() {
  /* COUNTER */
  //Few ES2015 React components. Click on anything in the #app div to increase the counter
  const renderBase = () => {
    ReactDOM.render(
      <Base counter={counterStore.getState()}
            handleClick = {() => {counterStore.dispatch({type: 'INCREMENT'})}}/>,
      document.getElementById('app')
    );
  }
  renderBase();
  counterStore.subscribe(renderBase)


  /* USERS */
  //Created a few React components to build a UserList dynamically reflecting the app's state
  const renderUsers = () => {
    ReactDOM.render(
      <UserList2 store={userListStore2}/>,
      document.getElementById('userList')
    );
  }

  userListStore2.subscribe(renderUsers); // When the state change, renders again
  renderUsers(); //For initial rendering
});
