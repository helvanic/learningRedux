import expect from 'expect'
import { createStore } from 'redux'

//Reducer function. Controls the state of the app
const counter = (state = 0, action) => {
  //Reducer Logic
  switch(action.type){
    case 'INCREMENT':
      return state+1;
      break;
    case 'DECREMENT':
      return state-1;
      break;
    default :
      return state;
      break;
  }
}

const store = createStore(counter);

export default store;


//Tests
expect(
  counter(0, {type : 'INCREMENT'})
).toEqual(1);

expect(
  counter(1, {type : 'INCREMENT'})
).toEqual(2);

expect(
  counter(2, {type : 'DECREMENT'})
).toEqual(1);

expect(
  counter(1, {type : 'DECREMENT'})
).toEqual(0);

expect(
  counter(0, {type : 'eugflkdg'})
).toEqual(0);
