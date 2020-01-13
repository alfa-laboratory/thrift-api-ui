import { createSelector } from 'reselect';
import { SelectedMethod } from '../reducers/editorReducer';
import { RootState } from '../reducers';

function getTabName(selectedMethod: SelectedMethod | undefined) {
    if (selectedMethod) {
        return `${ selectedMethod.serviceName }::${ selectedMethod.methodName }`;
    }

    return 'New tab';
}

const editorStateSelector = (state: RootState) => state.editor;
export const tabsSelector = createSelector(
    editorStateSelector,
    (editor) => editor.tabsOrder.map(tabId => ({
        name: getTabName(editor.tabs[tabId].selectedMethod),
        id: tabId
    }))
);
export const activeTabIdSelector = createSelector(
    editorStateSelector,
    (editor) => editor.activeTabId
);
export const activeTabSelector = createSelector(
    editorStateSelector,
    activeTabIdSelector,
    (state, tabId) => state.tabs[tabId]
);
export const selectedMethodSelector = createSelector(
    activeTabSelector,
    tab => tab.selectedMethod || null
);
export const endpointSelector = createSelector(
    activeTabSelector,
    tab => tab.endpoint
);
export const requestSelector = createSelector(
    activeTabSelector,
    tab => tab.request
);
export const responseSelector = createSelector(
    activeTabSelector,
    tab => tab.response || ''
);
export const requestLoadingStateSelector = createSelector(
    activeTabSelector,
    tab => tab.requestLoadingState
);
export const modifiedServiceNameSelector = createSelector(
    selectedMethodSelector,
    selectedMethod => (selectedMethod && selectedMethod.modifiedServiceName) || ''
);
