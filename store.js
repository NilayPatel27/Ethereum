import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'acount',
  storage: AsyncStorage,
};
// const rootReducer = combineReducers({
//     firstReducer,
//     secondReducer,
//   })

const persisterReducer = persistReducer(persistConfig, counterReducer);
// const persisterReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: {
    counter: persisterReducer,
  },
  middleware: [thunk], // add thunk as middleware to the store to allow us to dispatch async actions in our components and reducers
});
export const persister = persistStore(store);
