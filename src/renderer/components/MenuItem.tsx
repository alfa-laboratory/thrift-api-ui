import React, { useCallback } from 'react';
import styled from 'styled-components';
import { animate } from '../utils/cssUtils';

type Props = {
    service: string;
    method: string;
    isSelected: boolean;
    onClick: (serviceName: string, methodName: string) => void;
};

const StyledItem = styled.div<{ isSelected: boolean }>`
    opacity: ${props => props.isSelected ? '1' : '0.6'};
    margin-left: 20px;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 8px;
    line-height: 1.4;
    font-size: 13px;
    transition: ${animate(['opacity'])};

    &:hover {
        opacity: 1;
    }
`;

export const MenuItem = (props: Props) => {
    const handleClick = useCallback(() => {
        props.onClick(props.service, props.method);
    }, []);

    return (
        <StyledItem onClick={ handleClick } isSelected={ props.isSelected }>
            { props.method }
        </StyledItem>
    );
}
