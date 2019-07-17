import React from 'react';
import styled from 'styled-components';
import Spin from 'arui-feather/spin';

export const StyledAppLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const AppLoader = () => (
    <StyledAppLoader>
        <Spin visible={ true } size='xl' />
    </StyledAppLoader>
);
