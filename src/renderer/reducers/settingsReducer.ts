import {
    AllActions,
    HIDE_SETTINGS,
    SAVE_ENDPOINT_HISTORY,
    SET_MULTIPLEXER_ENABLED,
    SET_PROXY_ENABLED,
    SET_PROXY_URL,
    SET_REQUEST_TIMEOUT,
    SET_THRIFT_SOURCE_PATH_SUCCESS,
    SET_VERSION,
    SHOW_SETTINGS
} from '../actions';

export type SettingsState = {
    endpointsHistory: string[];
    thriftPath?: string;
    proxyUrl?: string;
    isMultiplexerEnabled: boolean;
    isOpened: boolean;
    isProxyEnabled: boolean;
    requestTimeout: number;
    version?: string;
};

export const defaultState: SettingsState = {
    isMultiplexerEnabled: false,
    isOpened: false,
    isProxyEnabled: false,
    requestTimeout: 3000,
    endpointsHistory: []
};

export function settingsReducer(state: SettingsState = defaultState, action: AllActions): SettingsState {
    switch (action.type) {
        case SET_MULTIPLEXER_ENABLED:
            return {
                ...state,
                isMultiplexerEnabled: action.value
            };
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
