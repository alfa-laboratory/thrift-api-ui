import { ParsedService, ProgramAst } from 'thriftrw';
import {
    SettingsActionTypes,
    SET_THRIFT_SOURCE_PATH,
    SET_THRIFT_SOURCE_PATH_ERROR,
    SET_THRIFT_SOURCE_PATH_SUCCESS
} from '../actions/settings';
import { LoadingState } from '../utils/loading-state';

export type ServicesState = {
    services: Record<string, ParsedService>;
    asts: Record<string, ProgramAst>;
    loadingState: LoadingState;
};

const initialState: ServicesState = {
    services: {},
    asts: {},
    loadingState: LoadingState.Unknown
};

export function servicesReducer(state: ServicesState = initialState, action: SettingsActionTypes): ServicesState {
    switch (action.type) {
        case SET_THRIFT_SOURCE_PATH:
            return {
                ...state,
                loadingState: LoadingState.InProgress
            };
        case SET_THRIFT_SOURCE_PATH_SUCCESS:
            return {
                ...state,
                services: action.services,
                asts: action.asts,
                loadingState: LoadingState.Success
            };
        case SET_THRIFT_SOURCE_PATH_ERROR:
            return {
                ...state,
                loadingState: LoadingState.Error
            };
        default:
            return state;
    }
}
