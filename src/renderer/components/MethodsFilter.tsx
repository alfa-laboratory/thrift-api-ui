import React from 'react';
import Input from 'arui-feather/input';
import styled from 'styled-components';
import { ServicesMethods } from './ServicesMethods';
import { SavedRequestEntry } from '../utils/savedRequests';
import { SavedRequests } from './SavedRequests';
import { EditorTabItem } from './EditorTabItem';

type Props = {
    services: Record<string, string[]>;
    savedRequests: SavedRequestEntry[];
    onMethodSelect: (serviceName: string, methodName: string) => void;
    onSavedEntrySelect: (id: string) => void;
    onSavedEntryDelete: (id: string) => void;
    className?: string;
};

const FilterInputContainer = styled.div`
    padding: 10px;
`;

const TabsContainer = styled.div`
    border-bottom: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
`;

const filterAndTabsHeight = '120px';

const FilterAndTabsContainer = styled.div`
    height: ${filterAndTabsHeight};
`;

const TabContainer = styled.div`
    height: calc(100% - ${filterAndTabsHeight});
    overflow: scroll;
`;

export const MethodsFilter = React.memo((props: Props) => {
    const [searchString, setSearchString] = React.useState('');
    const [activeTab, setActiveTab] = React.useState<'saved' | 'methods'>('methods');

    const selectSavedTab = React.useCallback(() => {
        setActiveTab('saved');
    }, []);
    const selectMethodsTab = React.useCallback(() => {
        setActiveTab('methods');
    }, []);

    return (
        <div className={ props.className }>
            <FilterAndTabsContainer>
                <FilterInputContainer>
                    <Input
                        value={ searchString }
                        onChange={ setSearchString }
                        width='available'
                        view='filled'
                        label='Filter'
                    />
                </FilterInputContainer>
                <TabsContainer>
                    <EditorTabItem
                        name='methods'
                        id='methods'
                        isActive={ activeTab === 'methods' }
                        onClick={ selectMethodsTab }
                        hideCloseButton={ true }
                    />
                    <EditorTabItem
                        name='Saved'
                        id='saved'
                        isActive={ activeTab === 'saved' }
                        onClick={ selectSavedTab }
                        hideCloseButton={ true }
                    />
                </TabsContainer>
            </FilterAndTabsContainer>

            <TabContainer>
                { activeTab === 'saved' && (
                    <SavedRequests
                        searchString={ searchString }
                        savedRequests={ props.savedRequests }
                        onSavedEntryDelete={ props.onSavedEntryDelete }
                        onSavedEntrySelect={ props.onSavedEntrySelect }
                    />
                ) }
                { activeTab === 'methods' && (
                    <ServicesMethods
                        searchString={ searchString }
                        services={ props.services }
                        onMethodSelect={ props.onMethodSelect }
                    />
                ) }
            </TabContainer>
        </div>
    );
});
