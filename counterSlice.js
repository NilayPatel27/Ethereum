import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    array: [],
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addressArray: (state, action) => {
      state.array.push(action.payload);
      let arr = state.array;
      for(let i = 0; i < arr.length; i++){
        if(arr[i].address === action.payload.name){
          arr.splice(i,1);
        }
      }
      arr = [...new Set(arr)];
      // console.log(arr[0].balance);
      // arr[0].balance= 3;
      // console.log('bal',arr[0].balance);

      // arr.splice(0,1);
      // console.log('arr',arr);
      state.array = arr;

      // state.array += action.payload;
    }
  },
});

export const {increment, decrement, incrementByAmount,addressArray} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
// export const addAddress = address => dispatch => {


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;
export const selectAddress = state => state.counter.array;
export default counterSlice.reducer;
