import expect from 'expect';
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

const User = (state, action) => {
  switch(action.type){
    case 'ADD_USER':
      return {
        id : action.id,
        name : action.name,
        verified : false
      }
    break;
    case 'REMOVE_USER':
      return state.filter((user) => {
        if(user.id != action.id){
          return user;
        }
      });
    break;
    case 'VERIFY_USER':
      if(state.id != action.id){
        return state;
      }else{
        return Object.assign({}, state, {verified : true});
      }
    break;
    case 'RESET_USERS':
      return [];
    break;
    default:
    return state;
  }
}


//Reducer function. Controls the state of the app. Default is empty array
const userList = (state = [], action) => {
  //Reducer Logic
  switch(action.type){
    case 'ADD_USER':
      return [...state, User(undefined, action)];
      break;
    case 'VERIFY_USER':
      return state.map((user) => {
        return User(user, action)
      });
      break;
    case 'REMOVE_USER':
      return User(state, action);
      break;
    case 'RESET_USERS':
      return User(state, action);
      break;
    default :
      return state;
      break;
  }
}


const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  };
};

const userApp = combineReducers({
  users : userList,
  visibilityFilter : visibilityFilter
});

const store = createStore(userApp);

export default store;

/* ****************** Tests ***************** */

/* ADD_USER */
const testAddUser = () => {
  const previousState = [];
  const action = {
    type : 'ADD_USER',
    id : 0,
    name : 'Victor Dupuy'
  };
  const nextState = [
    {
      id : 0,
      name : 'Victor Dupuy',
      verified : false
    }
  ];

  //Making previousState & action immutable
  deepFreeze(previousState);
  deepFreeze(action);

  expect(
    userList(previousState, action)
  ).toEqual(nextState);
}


/* VERIFY_USER */
const testVerifyUser = () => {
  const previousState = [
    {
      id : 0,
      name : 'Victor Dupuy',
      verified : false
    },
    {
      id : 1,
      name : 'Test User',
      verified : false
    }
  ];

  const action = {
    type : 'VERIFY_USER',
    id : 0
  };

  const nextState = [
    {
      id : 0,
      name : 'Victor Dupuy',
      verified : true
    },
    {
      id : 1,
      name : 'Test User',
      verified : false
    }
  ];

  expect(
    userList(previousState, action)
  ).toEqual(nextState);
}


/* REMOVE_USER */
/* ****************** Tests ***************** */
const testRemoveUser = () => {
  const previousState = [
    {
      id : 125,
      name : 'Joffrey Baratheon',
      verified : true
    },
    {
      id : 456,
      name : 'Tyrion Lanister',
      verified : false
    },
    {
      id : 666,
      name : 'Victor Dupuy',
      verified : false
    },
    {
      id : 1024,
      name : 'Ned Stark',
      verified : false
    }
  ];
  const action = {
    type : 'REMOVE_USER',
    id : 666
  };
  const nextState = [
    {
      id : 125,
      name : 'Joffrey Baratheon',
      verified : true
    },
    {
      id : 456,
      name : 'Tyrion Lanister',
      verified : false
    },
    {
      id : 1024,
      name : 'Ned Stark',
      verified : false
    }
  ];

  //Making previousState & action immutable
  deepFreeze(previousState);
  deepFreeze(action);

  expect(
    userList(previousState, action)
  ).toEqual(nextState);
}

/* RESET_USERS */

const testReserUsers = () => {
  const previousState = [
    {
      id : 125,
      name : 'Joffrey Baratheon',
      verified : true
    },
    {
      id : 456,
      name : 'Tyrion Lanister',
      verified : false
    },
    {
      id : 1024,
      name : 'Ned Stark',
      verified : false
    }
  ];
  const action = {
    type : 'RESET_USERS'
  }
  const nextState = [];

  deepFreeze(previousState);
  deepFreeze(action);

  expect(
    userList(previousState, action)
  ).toEqual(nextState);
}

/* Test Launch */
testAddUser();
console.log("Adding user tests passed");
console.log("------------------------");
testVerifyUser();
console.log("Verify user tests passed");
console.log("-----------------------");
testRemoveUser();
console.log('Remove user tests passed');
console.log('------------------------');
testReserUsers();
console.log('Reset users tests passed');
console.log('------------------------');
