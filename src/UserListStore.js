import expect from 'expect';
import { createStore } from 'redux';
import deepFreeze from 'deep-freeze';

//Smaller reducer functions. Each part of the State tree should get his own.
// => Make them as cohesive as possible
// => MUST BE PURE FUNCTIONS OF COURSE : (state, action) => state

/* Three ways to do it.

  1°) One task per reducer function
      => addUser
      => verifyUser
      => etc...
  2°) One part of the state tree per reducer function
      => user = (state, action) =>{
           switch(action.type){
              case 'ADD_USER':
                return xxxxx;
              case 'VERIFY_USER':
                return vvvvv;
              default:
                return state;
           }
         }
         displayedImage = (state, action) =>{
            switch(action.type){
              case 'PREVIOUS_IMG':
                return yyyyy;
              case 'NEXT_IMG' :
                return zzzzz;
              default :
                return state;
          }
       }
    3°) Both at the same time
        =>
        addUser = (state, action) => {
          if(action.type == 'ADD_USER'){
            return nextState
          }
        }
        verifyUser = (state, action) => {
          if(action.type == 'VERIFY_USER'){
            return nextState
          }
        }
        user = (state, action) =>{
             switch(action.type){
                case 'ADD_USER':
                  return (addUser(state, action));
                case 'VERIFY_USER':
                  return (verifyUser(state, action));
                default:
                  return state;
             }
           }
      It's possible to put these methods into a class named
      UserClass and import it, to modularize a bit more.

I prefer the third way to do it, because it separates every
feature from one another. More modular & cohesive in my opinion:)
*/

class UserClass {

  _addUser(state, action) {
    if(action.type=='ADD_USER'){
      return {
        id : action.id,
        name : action.name,
        verified : false
      }
    }else{
      return state;
    }
  }

  _verifyUser(state, action) {
    if(action.type == 'VERIFY_USER'){
      if(state.id != action.id){
        return state;
      }else{
        return Object.assign({}, state, {verified : true});
      }
    }
  }

  _removeUser(state, action) {
    if(action.type=='REMOVE_USER'){
      return state.filter((user) => {
        if(user.id != action.id){
          return user;
        }
      });
    }else{
      return state;
    }
  }
}

const User = new UserClass();

//Reducer function. Controls the state of the app. Default is empty array
const userList = (state = [], action) => {
  //Reducer Logic
  switch(action.type){
    case 'ADD_USER':
      return [...state, User._addUser(undefined, action)];
      break;
    case 'VERIFY_USER':
      return state.map((user) => {
        return User._verifyUser(user, action)
      });
      break;
    case 'REMOVE_USER':
      return User._removeUser(state, action);
      break;
    default :
      return state;
      break;
  }
}

const store = createStore(userList);

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

testAddUser();
console.log("Adding user tests passed");
console.log("------------------------");

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

testVerifyUser();
console.log("Verify user tests passed");
console.log("-----------------------");

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

testRemoveUser();
console.log('Remove user tests passed');
console.log('------------------------');
