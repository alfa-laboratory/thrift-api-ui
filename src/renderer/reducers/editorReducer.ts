import { LoadingState } from '../utils/loadingState';
import {
    AllActions,
    CREATE_TAB,
    CLOSE_TAB,
    SELECT_TAB,
    SELECT_SERVICE_AND_METHOD,
    SET_ENDPOINT,
    SET_REQUEST,
    SET_SERVICE_NAME,
    SUBMIT_REQUEST,
    SUBMIT_REQUEST_ERROR,
    SUBMIT_REQUEST_SUCCESS,
    SET_THRIFT_SOURCE_PATH_SUCCESS, LOAD_SAVED_REQUEST
} from '../actions';

export type SelectedMethod = {
    serviceName: string;
    methodName: string;
    modifiedServiceName?: string;
}

export type SingleTabState = {
    selectedMethod?: SelectedMethod;
    endpoint: string;
    request: string;
    requestLoadingState: LoadingState;
    response?: string;
};

export type EditorReducerState = {
    tabs: {
        [id: string]: SingleTabState;
    };
    tabsOrder: string[];
    activeTabId: string;
    tabKeyCounter: number;
};

const DEFAULT_TAB_STATE: SingleTabState = {
    endpoint: '',
    request: '',
    requestLoadingState: LoadingState.Unknown
};

const initialState: EditorReducerState = {
    tabs: {
        '0': { ...DEFAULT_TAB_STATE }
    },
    tabsOrder: ['0'],
    activeTabId: '0',
    tabKeyCounter: 0
};

export function editorReducer(state: EditorReducerState = initialState, action: AllActions): EditorReducerState {
    switch (action.type) {
        case CREATE_TAB: {
            const newTabCounter = state.tabKeyCounter + 1;

            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [newTabCounter.toString(10)]: { ...DEFAULT_TAB_STATE }
                },
                tabsOrder: [
                    ...state.tabsOrder,
                    newTabCounter.toString(10)
                ],
                activeTabId: newTabCounter.toString(10),
                tabKeyCounter: newTabCounter
            };
        }
        case CLOSE_TAB: {
            const tabs = { ...state.tabs };
            delete tabs[action.tabId];
            const tabsOrder = state.tabsOrder.filter(id => id !== action.tabId);

            let tabKeyCounter = state.tabKeyCounter;
            let activeTabId = state.activeTabId === action.tabId
                ? tabsOrder[tabsOrder.length - 1]
                : state.activeTabId;

            if (tabsOrder.length === 0) {
                tabKeyCounter = state.tabKeyCounter + 1;
                activeTabId = tabKeyCounter.toString(10);
                tabs[activeTabId] = { ...DEFAULT_TAB_STATE };
                tabsOrder.push(activeTabId);
            }

            return {
                ...state,
                tabs,
                tabsOrder,
                activeTabId,
                tabKeyCounter
            };
        }
        case SELECT_TAB:
            return {
                ...state,
                activeTabId: action.tabId
            };
        case SELECT_SERVICE_AND_METHOD:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        selectedMethod: {
                            serviceName: action.serviceName,
                            methodName: action.methodName,
                            modifiedServiceName: action.serviceName,
                        }
                    }
                }
            };
        case SET_ENDPOINT:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        endpoint: action.value
                    }
                }
            };
        case SET_REQUEST:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        request: action.value
                    }
                }
            };
        case SET_SERVICE_NAME:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        selectedMethod: {
                            ...action.selectedMethod
                        }
                    }
                }
            };
        case SUBMIT_REQUEST:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        requestLoadingState: LoadingState.InProgress
                    }
                }
            };
        case SUBMIT_REQUEST_ERROR:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        requestLoadingState: LoadingState.Error,
                        response: action.error.toString()
                    }
                }
            };
        case SUBMIT_REQUEST_SUCCESS:
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [state.activeTabId]: {
                        ...state.tabs[state.activeTabId],
                        requestLoadingState: LoadingState.Success,
                        response: action.response
                    }
                }
            };
        case SET_THRIFT_SOURCE_PATH_SUCCESS:
            return {
                ...state,
                tabs: {
                    '0': { ...DEFAULT_TAB_STATE }
                },
                tabsOrder: ['0'],
                activeTabId: '0',
            };
        case LOAD_SAVED_REQUEST: {
            const newTabCounter = state.tabKeyCounter + 1;

            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [newTabCounter.toString(10)]: {
                        ...DEFAULT_TAB_STATE,
                        endpoint: action.entry.endpoint,
                        request: action.entry.request,
                        selectedMethod: {
                            serviceName: action.entry.serviceName,
                            methodName: action.entry.methodName,
                            modifiedServiceName: action.entry.serviceName
                        }
                    }
                },
                tabsOrder: [
                    ...state.tabsOrder,
                    newTabCounter.toString(10)
                ],
                activeTabId: newTabCounter.toString(10),
                tabKeyCounter: newTabCounter
            };
        }
        default:
            return state;
    }
}
