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
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #e6e6e6;
`;

const TabPlusButton = styled.button`
    border: 0;
    padding: 10px;
    outline: 0;
    cursor: pointer;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    height: 39px;
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
                <EditorTabItem
                    name={ tab.name }
                    id={ tab.id }
                    isActive={ tab.id === props.activeTabId }
                    onClick={ props.onSelectTab }
                    onCloseClick={ props.onTabClose }
                    key={ tab.id }
                />
            )) }
            <TabPlusButton onClick={ props.onCreateTab }>
                <IconPaymentPlus />
            </TabPlusButton>
        </StyledEditorTabs>
    )
};
