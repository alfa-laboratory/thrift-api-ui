import React from 'react';
import { SavedRequestEntry } from '../utils/savedRequests';
import styled from 'styled-components';
import IconCloseCircle from 'arui-feather/icon/ui/close-circle';

type Props = {
    request: SavedRequestEntry;
    onDeleteClick: (id: string) => void;
};

const StyledSavedRequestItem = styled.div`
    display: flex;
`;

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Description = styled.div`
    font-size: 12px;
`;

const DeleteButton = styled.button`
    background: 0;
    border: 0;
    opacity: 0.5;
    padding: 0;
    cursor: pointer;
    margin: 0 0 0 15px;
    :hover {
        opacity: 0.7;
    }
`;

export const SavedRequestItem = ({ request, onDeleteClick }: Props) => {
    const handleDeleteClick = React.useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        onDeleteClick(request.id || '');
    }, [onDeleteClick, request.id]);

    return (
        <StyledSavedRequestItem>
            <Title>
                { request.name }
                <Description>
                    { request.serviceName }::{ request.methodName }
                </Description>
            </Title>
            <DeleteButton title='Delete' onClick={ handleDeleteClick }>
                <IconCloseCircle />
            </DeleteButton>
        </StyledSavedRequestItem>
    );
};
