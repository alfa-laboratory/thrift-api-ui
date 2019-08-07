import Heading from 'arui-feather/heading';
import Menu from 'arui-feather/menu';
import React from 'react';
import { SavedRequestEntry } from '../utils/savedRequests';
import { SavedRequestItem } from './SavedRequestItem';

type Props = {
    searchString: string;
    savedRequests: SavedRequestEntry[];
    onSavedEntryDelete: (id: string) => void;
    onSavedEntrySelect: (id: string) => void;
};

export const SavedRequests = (props: Props) => {
    const loweredSearchString = props.searchString.toLocaleLowerCase();

    const menuContent = props.savedRequests
        .filter((request) => {
            if (!props.searchString) {
                return true;
            }

            return request.name.toLocaleLowerCase().includes(loweredSearchString) ||
                request.methodName.toLocaleLowerCase().includes(loweredSearchString) ||
                request.serviceName.toLocaleLowerCase().includes(loweredSearchString) ||
                request.request.toLocaleLowerCase().includes(loweredSearchString);
        })
        .map(request => ({
            type: 'item' as const,
            content: (
                <SavedRequestItem request={ request } onDeleteClick={ props.onSavedEntryDelete } />
            ),
            value: `${ request.id }`,
            props: {
                url: `${ request.id }`,
                onClick: (event: MouseEvent) => {
                    event.preventDefault();
                    props.onSavedEntrySelect(request.id || '');
                }
            }
        }));

    return (
        <>
            { menuContent.length === 0 && (
                <Heading size='xs'>
                    Nothing matched
                </Heading>
            ) }
            <Menu
                content={ menuContent }
            />
        </>
    )
};
