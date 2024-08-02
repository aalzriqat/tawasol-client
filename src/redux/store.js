import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';
import { setAuthToken } from '../utils';
 
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

let currentState = store.getState();
store.subscribe(() => {
    let prevState = currentState;
    currentState = store.getState();

    if (prevState.users.token !== currentState.users.token) {
        const token = currentState.users.token;
        setAuthToken(token);
    }
})
export default store