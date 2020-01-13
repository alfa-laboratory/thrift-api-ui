import React from 'react';
import styled from 'styled-components';
import { MethodsFilterContainer } from '../containers/MethodsFilterContainer';
import { TabsContainer } from '../containers/TabsContainer';
import { EndpointContainer } from '../containers/EndpointContainer';
import { MultiplexerContainer } from '../containers/MultiplexerContainer';
import { RequestEditorContainer } from '../containers/RequestEditorContainer';
import { ResponseViewerContainer } from '../containers/ResponseContainer';

const StyledLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
        "tabs tabs"
        "endpoint endpoint"
        "multiplexer multiplexer"
        "browser request"
        "browser response";
    grid-template-columns: 280px minmax(0, 1fr);
    grid-template-rows: auto auto auto 1fr 1fr;
`;

const StyledBrowser = styled(MethodsFilterContainer)`
    grid-area: browser;
    justify-self: stretch;
    align-self: stretch;
    border-right: 1px solid #eee;
    padding: 24px;
    background: #e5e5e5;
`;

const StyledTabs = styled(TabsContainer)`
    grid-area: tabs;
`;

const StyledRequestEditor = styled(RequestEditorContainer)`
    grid-area: request;
    border-bottom: 1px solid #eee;
    padding: 16px 0;
`;

const StyledEndpoint = styled(EndpointContainer)`
    grid-area: endpoint;
    background: #1a1a1a;
`;

const StyledMultiplexer = styled(MultiplexerContainer)`
    grid-area: multiplexer;
    background: #1a1a1a;
`;

const StyledResponseViewer = styled(ResponseViewerContainer)`
    grid-area: response;
    padding: 16px 0;
`;

export const Layout = () => (
    <>
        <StyledLayout>
            <StyledBrowser />
            <StyledTabs />
            <StyledRequestEditor />
            <StyledEndpoint />
            <StyledMultiplexer />
            <StyledResponseViewer />
        </StyledLayout>
    </>
);
