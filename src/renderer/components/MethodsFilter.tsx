import React from 'react';
import Input from 'arui-feather/input';
import SearchIcon from 'arui-feather/icon/action/search';
import styled from 'styled-components';
import { ServicesMethods } from './ServicesMethods';
import { SavedRequestEntry } from '../utils/savedRequests';
import { SavedRequests } from './SavedRequests';
import { BrowserTabItem } from './BrowserTabItem';
import { SelectedMethod } from '../reducers/editorReducer';

type Props = {
    services: Record<string, string[]>;
    savedRequests: SavedRequestEntry[];
    selectedMethod: SelectedMethod | null;
    onMethodSelect: (serviceName: string, methodName: string) => void;
    onSavedEntrySelect: (id: string) => void;
    onSavedEntryDelete: (id: string) => void;
    className?: string;
};

const FilterInputContainer = styled.div`
    margin: 19px 0;
`;

const TabsContainer = styled.div``;

const filterAndTabsHeight = '110px';

const FilterAndTabsContainer = styled.div`
    height: ${filterAndTabsHeight};
`;

const TabContainer = styled.div`
    height: calc(100% - ${filterAndTabsHeight});
    overflow: scroll;
`;

const StyledInput = styled(Input)`
    && .input__box {
        background: #ffffff;
        border: 0;
        border-radius: 4px;
        height: 40px;
        box-shadow: none;
        box-shadow: 0px 1px 4px rgba(11, 31, 53, 0.12);
    }

    && .input__control {
        color: #0B1F35;
        height: 40px;
        min-height: auto;
        line-height: 40px;
        padding: 0;
        font-size: 13px;

        ::placeholder {
            color: #0B1F35;
            opacity: 0.3;
        }
    }
`;

const StyledSearchIcon = styled(SearchIcon)`
    opacity: 0.4;
`;

enum Tab {
    METHODS = 'methods',
    SAVED = 'saved'
}

const tabs: Record<string, string> = {
    [Tab.METHODS]: 'Methods',
    [Tab.SAVED]: 'Saved Requests'
};

export const MethodsFilter = React.memo((props: Props) => {
    const [searchString, setSearchString] = React.useState('');
    const [activeTab, setActiveTab] = React.useState<string>(Tab.METHODS);

    const selectTab = React.useCallback((id: string) => {
        setActiveTab(id);
    }, []);

    return (
        <div className={ props.className }>
            <FilterAndTabsContainer>
                <TabsContainer>
                    {
                        Object.keys(tabs).map(id => (
                            <BrowserTabItem
                                key={ id }
                                name={ tabs[id] }
                                id={ id }
                                isActive={ activeTab === id }
                                onClick={ selectTab }
                            />
                        ))
                    }
                </TabsContainer>
                <FilterInputContainer>
                    <StyledInput
                        value={ searchString }
                        onChange={ setSearchString }
                        width='available'
                        view='filled'
                        placeholder='Search...'
                        leftAddons={ <StyledSearchIcon size='s' /> }
                    />
                </FilterInputContainer>
            </FilterAndTabsContainer>

            <TabContainer>
                { activeTab === Tab.SAVED && (
                    <SavedRequests
                        searchString={ searchString }
                        savedRequests={ props.savedRequests }
                        onSavedEntryDelete={ props.onSavedEntryDelete }
                        onSavedEntrySelect={ props.onSavedEntrySelect }
                    />
                ) }
                { activeTab === Tab.METHODS && (
                    <ServicesMethods
                        searchString={ searchString }
                        selectedMethod={ props.selectedMethod }
                        services={ props.services }
                        onMethodSelect={ props.onMethodSelect }
                    />
                ) }
            </TabContainer>
        </div>
    );
});
