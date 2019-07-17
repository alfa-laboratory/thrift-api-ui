import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { MethodsFilter } from '../components/MethodsFilter';
import { selectServiceAndMethod } from '../actions/editor';
import { bindActionCreators, Dispatch } from 'redux';
import { methodsListSelector } from '../selectors/services';

function mapStateToProps(state: RootState) {
    return {
        services: methodsListSelector(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onMethodSelect: selectServiceAndMethod,
    }, dispatch);
}

export const MethodsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(MethodsFilter);
