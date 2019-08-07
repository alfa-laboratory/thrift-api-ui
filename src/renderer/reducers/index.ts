import { combineReducers } from 'redux';
import { servicesReducer } from './servicesReducer';
import { editorReducer } from './editorReducer';
import { settingsReducer } from './settingsReducer';
import { savedRequestsReducer } from './savedRequestsReducer';

export const reducers = combineReducers({
    services: servicesReducer,
    editor: editorReducer,
    settings: settingsReducer,
    savedRequests: savedRequestsReducer
});

export type RootState = ReturnType<typeof reducers>;
