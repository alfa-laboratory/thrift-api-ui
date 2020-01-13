import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const settingsSelector = (state: RootState) => state.settings;

export const multiplexerEnabledSelector = createSelector(
    settingsSelector,
    state => state.isMultiplexerEnabled
);

export const proxyUrlSelector = createSelector(
    settingsSelector,
    state => state.proxyUrl
);

export const proxyEnabledSelector = createSelector(
    settingsSelector,
    state => state.isProxyEnabled
);

export const requestProxySelector = createSelector(
    proxyUrlSelector,
    proxyEnabledSelector,
    (url, isEnabled) => isEnabled ? url : undefined
);

export const requestTimeoutSelector = createSelector(
    settingsSelector,
    state => state.requestTimeout
);

export const endpointHistorySelector = createSelector(
    settingsSelector,
    state => state.endpointsHistory
);

export const thriftSrcPathSelector = createSelector(
    settingsSelector,
    state => state.thriftPath
);

export const isSettingsOpenedSelector = createSelector(
    settingsSelector,
    state => state.isOpened
);

export const versionSelector = createSelector(
    settingsSelector,
    state => state.version
);
