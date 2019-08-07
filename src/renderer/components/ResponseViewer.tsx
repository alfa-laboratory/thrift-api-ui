import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { LoadingState } from '../utils/loadingState';
import Spin from 'arui-feather/spin';
import styled from 'styled-components';

type Props = {
    value: string;
    requestLoadingState: LoadingState;
    className?: string;
};

const StyledResponseViewer = styled.div<Props>`
    position: relative;
    transition: opacity ease 0.1s;
    opacity: ${(props) => props.requestLoadingState === LoadingState.Unknown ? 0 : 1};
`;

const StyledSpin = styled(Spin)`
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-50%) translateY(-50%);
`;

export const ResponseViewer = (props: Props) => (
    <StyledResponseViewer {...props}>
        <MonacoEditor
            language="json"
            theme="vs-light"
            value={ props.value }
            options={ { scrollBeyondLastLine: false, readOnly: true, automaticLayout: true } }
        />
        <StyledSpin visible={ props.requestLoadingState === LoadingState.InProgress } size='xl' />
    </StyledResponseViewer>
);
