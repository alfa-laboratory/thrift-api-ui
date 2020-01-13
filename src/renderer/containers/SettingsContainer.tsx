import React from 'react';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settings';
import { RootState } from '../reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { Settings } from '../components/Settings';
import {
    isSettingsOpenedSelector,
    multiplexerEnabledSelector,
    proxyEnabledSelector,
    proxyUrlSelector,
    requestTimeoutSelector,
    thriftSrcPathSelector,
    versionSelector
} from '../selectors/settings';
import { isThriftParsingInProgressSelector } from '../selectors/services';

function mapStateToProps(state: RootState) {
    return {
        isMultiplexerEnabled: multiplexerEnabledSelector(state),
        isProxyEnabled: proxyEnabledSelector(state),
        proxyUrl: proxyUrlSelector(state),
        requestTimeout: requestTimeoutSelector(state),
        thriftSrcPath: thriftSrcPathSelector(state),
        isOpened: isSettingsOpenedSelector(state),
        isThriftParsingInProgress: isThriftParsingInProgressSelector(state),
        version: versionSelector(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onProxyUrlChange: settingsActions.setProxyUrl,
        onIsMultiplexerEnabledChange: settingsActions.setMultiplexerEnabled,
        onIsProxyEnabledChange: settingsActions.setProxyEnabled,
        onRequestTimeoutChange: settingsActions.setRequestTimeout,
        onChangePathClick: settingsActions.showSelectThriftPathDialog,
        onClose: settingsActions.hideSettings
    }, dispatch);
}

export const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
