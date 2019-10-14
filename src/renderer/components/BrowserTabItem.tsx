import React from 'react';
import styled from 'styled-components';
import IconClose from 'arui-feather/icon/ui/close';
import { animate } from '../utils/cssUtils';

type Props = {
    name: string;
    id: string;
    isActive: boolean;
    onClick: (id: string) => void;
    className?: string;
};

type StyledButtonProps = { isActive: boolean; };

const StyledButton = styled.div<StyledButtonProps>`
    height: 24px;
    margin-right: 16px;
    font-size: 13px;
    outline: 0;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    opacity: ${props => props.isActive ? '1' : '0.4'};
    position: relative;
    transition: ${animate(['opacity'])};

    :after {
        content: '';
        display: block;
        position: absolute;
        background: #F03226;
        bottom: 0;
        opacity: ${props => props.isActive ? 1 : 0};
        right: ${props => props.isActive ? '8px' : '0'};
        left: ${props => props.isActive ? '8px' : '0' };
        height: ${props => props.isActive ? '3px' : '0px'};
        border-radius: 1.5px;
        transition: ${animate(['height', 'left', 'right', 'opacity'])};
    }
`;

export const BrowserTabItem = (props: Props) => {
    function handleClick(event: React.MouseEvent) {
        event.preventDefault();
        props.onClick(props.id);
    }

    return (
        <StyledButton
            role='button'
            className={ props.className }
            onClick={ handleClick }
            isActive={ props.isActive }
        >
            { props.name }
        </StyledButton>
    );
};
