// src/app/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/studentSlice';
import adminReducer from '../features/adminSlice';
import teacherReducer from '../features/teacherSlice';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['userInfo', 'admin', 'teacher'], // ensure these names match your state slices
};

const rootReducer = combineReducers({
  userInfo: userReducer,
  admin: adminReducer,
  teacher: teacherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
