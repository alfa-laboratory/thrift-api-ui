import React from 'react';
import IconPaymentPlus from 'arui-feather/icon/banking/payment-plus';
import { EditorTabItem } from './EditorTabItem';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { useOnMount } from '../utils/useOnMount';

type Props = {
    tabs: { id: string; name: string; }[];
    activeTabId: string;
    onSelectTab: (tabId: string) => void;
    onTabClose: (tabId?: string) => void;
    onCreateTab: () => void;
    className?: string;
};

const StyledEditorTabs = styled.div`
    padding-top: 8px;
    background: #000000;
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const StyledTabButton = styled(EditorTabItem)`
    display: table-cell;
`;

const TabPlusButton = styled.div`
    background: none;
    border: 0;
    padding: 10px;
    outline: 0;
    cursor: pointer;
    display: table-cell;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    width: 40px;
`;

export const EditorTabs = (props: Props) => {
    useOnMount(() => {
        ipcRenderer.on('newTab', () => {
            props.onCreateTab();
        });
        ipcRenderer.on('closeTab', () => {
            props.onTabClose();
        });

        return () => {
            ipcRenderer.removeAllListeners('newTab');
            ipcRenderer.removeAllListeners('closeTab');
        }
    });

    return (
        <StyledEditorTabs className={ props.className }>
            { props.tabs.map(tab => (
                <StyledTabButton
                    name={ tab.name }
                    id={ tab.id }
                    isActive={ tab.id === props.activeTabId }
                    onClick={ props.onSelectTab }
                    onCloseClick={ props.onTabClose }
                    hideCloseButton={ tab.id !== props.activeTabId }
                    key={ tab.id }
                />
            )) }
            <TabPlusButton onClick={ props.onCreateTab }>
                <IconPaymentPlus theme='alfa-on-color' />
            </TabPlusButton>
        </StyledEditorTabs>
    )
};
