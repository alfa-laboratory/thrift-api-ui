import { ParsedService, ProgramAst } from 'thriftrw';
import { remote } from 'electron';
import { ActionsUnion, AppThunkAction } from '../utils/actionsUnion';
import { parseAllThriftFilesFromDirectory } from '../thrift/parseAllThriftFilesFromDirectory';
import { endpointSelector, selectedMethodSelector } from '../selectors/editor';
import { stringIsAValidUrl } from '../utils/isValidUrl';

export const SET_MULTIPLEXER_ENABLED = '@settings/setMutiplexerEnabled';
export const SET_THRIFT_SOURCE_PATH = '@settings/setThriftSourcePath';
export const SET_THRIFT_SOURCE_PATH_SUCCESS = '@settings/setThriftSourcePathSuccess';
export const SET_THRIFT_SOURCE_PATH_ERROR = '@settings/setThriftSourcePathError';
export const SET_PROXY_URL = '@settings/setProxyUrl';
export const SET_PROXY_ENABLED = '@settings/setProxyEnabled';
export const SET_REQUEST_TIMEOUT = '@settings/setRequestTimeout';
export const SET_VERSION = '@settings/setVersion';
export const SAVE_ENDPOINT_HISTORY = '@settings/saveEndpointHistory';
export const SHOW_SETTINGS = '@settings/showSettings';
export const HIDE_SETTINGS = '@settings/hideSettings';

const settingsAC = {
    setMultiplexerEnabled(value: boolean) {
        return {
            type: SET_MULTIPLEXER_ENABLED,
            value
        } as const;
    },
    setThriftSourcePath(path: string) {
        return {
            type: SET_THRIFT_SOURCE_PATH,
            path
        } as const;
    },
    setThriftSourcePathSuccess(
        path: string,
        services: Record<string, ParsedService>,
        asts: Record<string, ProgramAst>
    ) {
        return {
            type: SET_THRIFT_SOURCE_PATH_SUCCESS,
            path,
            services,
            asts
        } as const;
    },
    setThriftSourcePathError(
        path: string,
        error: Error
    ) {
        return {
            type: SET_THRIFT_SOURCE_PATH_ERROR,
            path,
            error
        } as const;
    },
    setProxyUrl(value: string) {
        return {
            type: SET_PROXY_URL,
            value
        } as const;
    },
    setProxyEnabled(value: boolean) {
        return {
            type: SET_PROXY_ENABLED,
            value
        } as const;
    },
    setRequestTimeout(value: number) {
        return {
            type: SET_REQUEST_TIMEOUT,
            value
        } as const;
    },
    saveEndpointHistory(endpoint: string, serviceName?: string) {
        return {
            type: SAVE_ENDPOINT_HISTORY,
            endpoint,
            serviceName
        } as const;
    },
    showSettings() {
        return {
            type: SHOW_SETTINGS,
        } as const;
    },
    hideSettings() {
        return {
            type: HIDE_SETTINGS,
        } as const;
    },
    setVersion(version: string) {
        return {
            type: SET_VERSION,
            version
        } as const;
    }
};

export type SettingsActionTypes = ActionsUnion<typeof settingsAC>;

type SettingsThunkAction = AppThunkAction<SettingsActionTypes>;

export function setThriftSource(path: string): SettingsThunkAction {
    return async (dispatch) => {
        dispatch(settingsAC.setThriftSourcePath(path));

        try {
            const result = await parseAllThriftFilesFromDirectory(path);

            dispatch(settingsAC.setThriftSourcePathSuccess(path, result.services, result.asts));
        } catch (e) {
            dispatch(settingsAC.setThriftSourcePathError(path, e));
        }
    }
}

export const setMultiplexerEnabled = settingsAC.setMultiplexerEnabled;
export const setProxyUrl = settingsAC.setProxyUrl;
export const setProxyEnabled = settingsAC.setProxyEnabled;
export const setRequestTimeout = settingsAC.setRequestTimeout;
export const saveEndpointHistory = settingsAC.saveEndpointHistory;
export const showSettings = settingsAC.showSettings;
export const hideSettings = settingsAC.hideSettings;
export const setVersion = settingsAC.setVersion;

export function onEndpointEditFinished(): SettingsThunkAction {
    return (dispatch, getState) => {
        const state = getState();
        const endpoint = endpointSelector(state);
        const method = selectedMethodSelector(state);
        if (stringIsAValidUrl(endpoint)) {
            dispatch(settingsAC.saveEndpointHistory(endpoint, method ? method.serviceName : undefined));
        }
    };
}

export function showSelectThriftPathDialog(): SettingsThunkAction {
    return (dispatch) => {
        const path = remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
            title: 'Choose path to thrift sources'
        });

        if (path && path[0]) {
            dispatch(setThriftSource(path[0]))
        }
    };
}
