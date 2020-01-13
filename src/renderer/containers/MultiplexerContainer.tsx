import React from 'react';
import { connect } from 'react-redux';
import * as editorActions from '../actions/editor';
import { MultiplexerEditor } from '../components/MultiplexerEditor';
import { RootState } from '../reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { selectedMethodSelector } from '../selectors/editor';
import { multiplexerEnabledSelector } from '../selectors/settings';

function mapStateToProps(state: RootState) {
    return {
        selectedMethod: selectedMethodSelector(state),
        isMultiplexerEnabled: multiplexerEnabledSelector(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onServiceNameChange: editorActions.setServiceName
    }, dispatch);
}

export const MultiplexerContainer = connect(mapStateToProps, mapDispatchToProps)(MultiplexerEditor);
