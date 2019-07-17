import { combineReducers } from 'redux';
import { servicesReducer } from './servicesReducer';
import { editorReducer } from './editorReducer';
import { settingsReducer } from './settingsReducer';

export const reducers = combineReducers({
    services: servicesReducer,
    editor: editorReducer,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof reducers>;
