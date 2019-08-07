import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { MethodsFilter } from '../components/MethodsFilter';
import { loadSavedRequest, selectServiceAndMethod } from '../actions/editor';
import { deleteRequest } from '../actions/savedRequests';
import { bindActionCreators, Dispatch } from 'redux';
import { methodsListSelector } from '../selectors/services';
import { savedRequestsSelector } from '../selectors/savedRequests';

function mapStateToProps(state: RootState) {
    return {
        services: methodsListSelector(state),
        savedRequests: savedRequestsSelector(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onMethodSelect: selectServiceAndMethod,
        onSavedEntryDelete: deleteRequest,
        onSavedEntrySelect: loadSavedRequest
    }, dispatch);
}

export const MethodsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(MethodsFilter);
