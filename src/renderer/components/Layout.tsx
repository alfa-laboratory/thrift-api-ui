import React from 'react';
import styled from 'styled-components';
import { MethodsFilterContainer } from '../containers/MethodsFilterContainer';
import { TabsContainer } from '../containers/TabsContainer';
import { EndpointContainer } from '../containers/EndpointContainer';
import { RequestEditorContainer } from '../containers/RequestEditorContainer';
import { ResponseViewerContainer } from '../containers/ResponseContainer';

const StyledLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
        "browser tabs"
        "browser endpoint"
        "browser request"
        "browser response";
    grid-template-columns: 290px minmax(0, 1fr);
    grid-template-rows: 40px 80px 1fr 2fr;
`;

const StyledBrowser = styled(MethodsFilterContainer)`
    grid-area: browser;
    justify-self: stretch;
    align-self: stretch;
    border-right: 1px solid #eee;
    overflow: scroll;
`;

const StyledTabs = styled(TabsContainer)`
    grid-area: tabs;
`;

const StyledRequestEditor = styled(RequestEditorContainer)`
    grid-area: request;
`;

const StyledEndpoint = styled(EndpointContainer)`
    grid-area: endpoint;
`;

const StyledResponseViewer = styled(ResponseViewerContainer)`
    grid-area: response;
`;

export const Layout = () => (
    <>
        <StyledLayout>
            <StyledBrowser />
            <StyledTabs />
            <StyledRequestEditor />
            <StyledEndpoint />
            <StyledResponseViewer />
        </StyledLayout>
    </>
);
