import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { ResponseViewer } from '../components/ResponseViewer';
import { requestLoadingStateSelector, responseSelector } from '../selectors/editor';

function mapStateToProps(state: RootState) {
    return {
        value: responseSelector(state),
        requestLoadingState: requestLoadingStateSelector(state)
    };
}

export const ResponseViewerContainer = connect(mapStateToProps)(ResponseViewer);
