import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import Base from './components/Base.jsx'
import UserList from './components/UserList.jsx'

// CounterStore
// import counterStore from './CounterStore'

// document.addEventListener('click', () => {
//     counterStore.dispatch({type : 'INCREMENT'});
//     console.log(counterStore.getState());
// });
// console.log(counterStore.getState());

//UserListStore
import userListStore from './UserListStore'

jQuery(function() {
  ReactDOM.render(
    <Base />,
    document.getElementById('app')
  );

  const renderUsers = () => {
    ReactDOM.render(
      <UserList users={userListStore.getState()}/>,
      document.getElementById('userList')
    );
  }

  renderUsers(); //For initial rendering
  userListStore.subscribe(renderUsers); // When the state change, renders again

});
