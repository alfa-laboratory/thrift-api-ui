import React from 'react';
import styled from 'styled-components';
import IconClose from 'arui-feather/icon/ui/close';
import IconButton from 'arui-feather/icon-button';

type Props = {
    isVisible: boolean;
    isClosable: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
    backdropClassName?: string;
};

type BackdropProps = {
    isVisible: boolean;
};

const Backdrop = styled.div<BackdropProps>`
    position: absolute;
    display: ${props => props.isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
`;

const StyledModal = styled.div`
    position: relative;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 30px;
    min-width: 100px;
    min-height: 70px;
`;

const StyledIconButton = styled(IconButton)`
    position: absolute;
    top: 2px;
    right: 2px;
`;

export const Modal = (props: Props) => (
    <Backdrop className={ props.backdropClassName } isVisible={ props.isVisible }>
        <StyledModal className={ props.className }>
            <StyledIconButton
                onClick={ props.isClosable ? props.onClose : undefined }
                disabled={ !props.isClosable }
            >
                <IconClose />
            </StyledIconButton>
            { props.children }
        </StyledModal>
    </Backdrop>
);
