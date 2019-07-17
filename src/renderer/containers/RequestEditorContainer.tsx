import React from 'react';
import { Editor } from '../components/Editor';
import { connect } from 'react-redux';
import * as editorActions from '../actions/editor';
import { RootState } from '../reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { requestSelector } from '../selectors/editor';
import { currentMethodJsonSchema } from '../selectors/services';

function mapStateToProps(state: RootState) {
    return {
        value: requestSelector(state),
        jsonSchema: currentMethodJsonSchema(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onChange: editorActions.setRequest
    }, dispatch);
}

export const RequestEditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);
