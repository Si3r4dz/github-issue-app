import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
    persistStore,
    persistReducer,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './slices/combinedSlice';

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

export const persistor = persistStore(store)
