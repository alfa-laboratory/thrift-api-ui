import React from 'react';
import { connect } from 'react-redux';
import * as editorActions from '../actions/editor';
import * as settingsActions from '../actions/settings';
import { EndpointEditor } from '../components/EndpointEditor';
import { RootState } from '../reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { endpointSelector } from '../selectors/editor';
import { endpointHistorySelector } from '../selectors/settings';

function mapStateToProps(state: RootState) {
    return {
        endpoint: endpointSelector(state),
        autocompleteOptions: endpointHistorySelector(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onEndpointChange: editorActions.setEndpoint,
        onSubmit: editorActions.submitRequest,
        onEndpointEditFinished: settingsActions.onEndpointEditFinished
    }, dispatch);
}

export const EndpointContainer = connect(mapStateToProps, mapDispatchToProps)(EndpointEditor);
