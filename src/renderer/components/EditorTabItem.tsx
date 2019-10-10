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
    hideCloseButton?: boolean;
    onCloseClick: (id: string) => void;
};

type StyledButtonProps = { isActive: boolean; };

const CornerDecoration = styled.div`
    display: none;
    position: absolute;
    bottom: 0;
    width: 8px;
    height: 8px;
    overflow: hidden;

    &:before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        box-shadow: 0 0 0 10px #1a1a1a;
    }
`;

const selectedTabStyle = `
    padding: 0 28px 0 12px;

    ${CornerDecoration} {
        display: block;
    }
`

const StyledButton = styled.div<StyledButtonProps>`
    background: ${props => props.isActive ? '#1a1a1a' : 'none'};
    border-radius: 8px 8px 0 0;
    height: 40px;
    flex: 1;
    max-width: 220px;
    line-height: 40px;
    color: #ffffff;
    opacity: ${props => props.isActive ? '1' : '0.6'};
    padding: 0 20px;
    font-size: 13px;
    outline: 0;
    cursor: pointer;
    position: relative;
    display: inline-block;
    position: relative;
    transition: ${animate(['background', 'opacity', 'padding'])};

    ${props => props.isActive ? selectedTabStyle : ''}
`;

const CloseButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
    outline: 0;
    opacity: 0.5;
    vertical-align: middle;

    &:hover {
        opacity: 0.7;
    }
`;

const LeftCornerDecoration = styled(CornerDecoration)`
    right: 100%;

    &:before {
        border-bottom-right-radius: 100%;
    }
`;

const RightCornerDecoration = styled(CornerDecoration)`
    left: 100%;

    &:before {
        border-bottom-left-radius: 100%;
    }
`;

const OverflowControl = styled.div`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const EditorTabItem = (props: Props) => {
    function handleClick(event: React.MouseEvent) {
        event.preventDefault();
        props.onClick(props.id);
    }

    function handleCloseClick(event: React.MouseEvent) {
        event.stopPropagation();
        if (props.hideCloseButton !== true) {
            props.onCloseClick(props.id);
        }
    }

    return (
        <StyledButton
            role='button'
            className={ props.className }
            onClick={ handleClick }
            isActive={ props.isActive }
        >
            <OverflowControl>{ props.name }</OverflowControl>
            { props.hideCloseButton !== true && (
                <CloseButton onClick={ handleCloseClick }>
                    <IconClose size='xs' theme='alfa-on-color' />
                </CloseButton>
            ) }
            <LeftCornerDecoration />
            <RightCornerDecoration />
        </StyledButton>
    );
};
