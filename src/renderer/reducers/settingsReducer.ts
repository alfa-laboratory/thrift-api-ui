import {
    SET_THRIFT_SOURCE_PATH_SUCCESS,
    SET_PROXY_URL,
    SET_PROXY_ENABLED,
    SET_REQUEST_TIMEOUT,
    SAVE_ENDPOINT_HISTORY,
    SHOW_SETTINGS,
    HIDE_SETTINGS,
    SET_VERSION,
    AllActions
} from '../actions';

export type SettingsState = {
    endpointsHistory: string[];
    thriftPath?: string;
    proxyUrl?: string;
    isOpened: boolean;
    isProxyEnabled: boolean;
    requestTimeout: number;
    version?: string;
};

export const defaultState: SettingsState = {
    isOpened: false,
    isProxyEnabled: false,
    requestTimeout: 3000,
    endpointsHistory: []
};

export function settingsReducer(state: SettingsState = defaultState, action: AllActions): SettingsState {
    switch (action.type) {
        case SET_THRIFT_SOURCE_PATH_SUCCESS:
            return {
                ...state,
                thriftPath: action.path
            };
        case SET_PROXY_URL:
            return {
                ...state,
                proxyUrl: action.value
            };
        case SET_PROXY_ENABLED:
            return {
                ...state,
                isProxyEnabled: action.value
            };
        case SET_REQUEST_TIMEOUT:
            return {
                ...state,
                requestTimeout: action.value
            };
        case SAVE_ENDPOINT_HISTORY:
            return {
                ...state,
                endpointsHistory: Array.from(new Set([...state.endpointsHistory, action.endpoint]))
            };
        case SHOW_SETTINGS:
            return {
                ...state,
                isOpened: true
            };
        case HIDE_SETTINGS:
            return {
                ...state,
                isOpened: false
            };
        case SET_VERSION:
            return {
                ...state,
                version: action.version
            }
    }
    return state;
}
