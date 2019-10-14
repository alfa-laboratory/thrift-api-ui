import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { MethodsFilter } from '../components/MethodsFilter';
import { loadSavedRequest, selectServiceAndMethod } from '../actions/editor';
import { deleteRequest } from '../actions/savedRequests';
import { bindActionCreators, Dispatch } from 'redux';
import { methodsListSelector } from '../selectors/services';
import { savedRequestsSelector } from '../selectors/savedRequests';
import { selectedMethodSelector } from '../selectors/editor';

function mapStateToProps(state: RootState) {
    return {
        services: methodsListSelector(state),
        savedRequests: savedRequestsSelector(state),
        selectedMethod: selectedMethodSelector(state)
    };
}

const mapDispatchToProps = {
    onMethodSelect: selectServiceAndMethod,
    onSavedEntryDelete: deleteRequest,
    onSavedEntrySelect: loadSavedRequest
};

export const MethodsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(MethodsFilter);
