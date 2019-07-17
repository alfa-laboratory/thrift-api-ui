import React from 'react';
import styled from 'styled-components';
import IconClose from 'arui-feather/icon/ui/close';

type Props = {
    name: string;
    id: string;
    isActive: boolean;
    onClick: (id: string) => void;
    onCloseClick: (id: string) => void;
    className?: string;
};

type StyledButtonProps = { isActive: boolean; };
const StyledButton = styled.div<StyledButtonProps>`
    border: 0;
    border-right: 1px solid #e6e6e6;
    border-bottom: ${ props => props.isActive ? '0' : '1px solid #e6e6e6' };
    background: ${ props => props.isActive ? '#fff' : '#f3f3f3' };
    padding: 10px 25px 10px 10px;
    height: 40px;
    font-size: 14px;
    outline: 0;
    cursor: pointer;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    :hover {
        opacity: 0.7;
    }
`;

export const EditorTabItem = (props: Props) => {
    function handleClick(event: React.MouseEvent) {
        event.preventDefault();
        props.onClick(props.id);
    }

    function handleCloseClick(event: React.MouseEvent) {
        event.stopPropagation();
        props.onCloseClick(props.id);
    }

    return (
        <StyledButton
            role='button'
            className={ props.className }
            onClick={ handleClick }
            isActive={ props.isActive }
        >
            { props.name }
            <CloseButton onClick={ handleCloseClick }>
                <IconClose size='xs' />
            </CloseButton>
        </StyledButton>
    );
};
