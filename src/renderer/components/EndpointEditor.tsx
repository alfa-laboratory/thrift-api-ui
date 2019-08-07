import React from 'react';
import Button from 'arui-feather/button';
import styled from 'styled-components';
import InputAutocomplete from 'arui-feather/input-autocomplete';
import { SaveRequestButton } from './SaveRequestButton';

type Props = {
    endpoint: string;
    autocompleteOptions: string[];
    onEndpointChange: (value: string) => void;
    onEndpointEditFinished: () => void;
    onSubmit: () => void;
    onSave: (name: string) => void;
    className?: string;
};

const UrlBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
`;

function filterEndpoints(inputValue: string, options: string[]) {
    return options.filter(val => val.indexOf(inputValue) !== -1);
}

export const EndpointEditor = (props: Props) => (
    <UrlBlock className={ props.className }>
        <InputAutocomplete
            label='Service endpoint'
            width='available'
            view='filled'
            value={ props.endpoint }
            closeOnSelect={ true }
            options={ filterEndpoints(props.endpoint, props.autocompleteOptions).map(value => ({ value })) }
            onChange={ props.onEndpointChange }
            onBlur={ props.onEndpointEditFinished }
        />
        <StyledButton
            text='Send'
            size='l'
            view='extra'
            onClick={ props.onSubmit }
        />
        <SaveRequestButton
            onSave={ props.onSave }
        />
    </UrlBlock>
);
