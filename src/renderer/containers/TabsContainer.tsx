import React from 'react';
import { EditorTabs } from '../components/EditorTabs';
import { connect } from 'react-redux';
import * as editorActions from '../actions/editor';
import { RootState } from '../reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { activeTabIdSelector, tabsSelector } from '../selectors/editor';

function mapStateToProps(state: RootState) {
    return {
        tabs: tabsSelector(state),
        activeTabId: activeTabIdSelector(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onSelectTab: editorActions.selectTab,
        onTabClose: editorActions.closeTab,
        onCreateTab: editorActions.createTab
    }, dispatch);
}

export const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(EditorTabs);
