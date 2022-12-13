import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter/counter-slice';
import productsReducer from './products/products-slice';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'test-photosi-app',
  version: 1,
  storage
}

const reducer = combineReducers({
  counterSlice: counterReducer,
  productsSlice: productsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
