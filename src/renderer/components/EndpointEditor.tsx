import React from 'react';
import Button from 'arui-feather/button';
import styled from 'styled-components';
import InputAutocomplete from 'arui-feather/input-autocomplete';

type Props = {
    endpoint: string;
    autocompleteOptions: string[];
    onEndpointChange: (value: string) => void;
    onEndpointEditFinished: () => void;
    onSubmit: () => void;
    className?: string;
};

const UrlBlock = styled.div`
    display: flex;
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
        <Button
            text='Send'
            size='l'
            onClick={ props.onSubmit }
        />
    </UrlBlock>
);
