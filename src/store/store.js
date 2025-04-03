import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

import gameReducer from './slices/gameSlice';
import categoriesReducer from './slices/categoriesSlice';
import customLegendsReducer from './slices/customLegendsSlice';
import settingsReducer from './slices/settingsSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['settings', 'customLegends'],
};

const rootReducer = combineReducers({
    game: gameReducer,
    categories: categoriesReducer,
    customLegends: customLegendsReducer,
    settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
