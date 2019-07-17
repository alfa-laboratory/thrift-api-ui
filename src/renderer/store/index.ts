import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers, RootState } from '../reducers';

function configureStore(initialState?: RootState) {
    const middlewares: any[] = [
        thunk
    ];
    const enhancer = composeWithDevTools(
        applyMiddleware(...middlewares)
    );

    const persistedReducer = persistReducer({
        storage,
        key: 'persisted-app',
        whitelist: ['settings']
    }, reducers);

    const store = createStore(persistedReducer, initialState, enhancer);

    const persistor = persistStore(store);

    return { store, persistor };
}

export const { store, persistor } = configureStore();

if (typeof module.hot !== 'undefined') {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer)
    );
}
