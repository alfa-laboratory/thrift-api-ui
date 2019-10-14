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
    && {
        font-size: 12px;
        text-transform: uppercase;
        background: #F03226;
        color: #ffffff;
        border: 0;
        margin-left: 16px;
    }
`;

const StyledInput = styled(InputAutocomplete)`
    && .input__box {
        background: rgba(255, 255, 255, .2);
        border: 0;
        border-radius: 4px;
        height: 40px;
        box-shadow: none;
    }

    && .input__control {
        color: #ffffff;
        height: 40px;
        min-height: auto;
        line-height: 40px;
        padding: 0;
        font-size: 13px;

        ::placeholder {
            color: #ffffff;
            opacity: 0.4;
        }
    }
`;

function filterEndpoints(inputValue: string, options: string[]) {
    return options.filter(val => val.indexOf(inputValue) !== -1);
}

export const EndpointEditor = (props: Props) => (
    <UrlBlock className={ props.className }>
        <StyledInput
            placeholder='Enter service endpoint'
            width='available'
            view='filled'
            value={ props.endpoint }
            closeOnSelect={ true }
            options={ filterEndpoints(props.endpoint, props.autocompleteOptions).map(value => ({ value })) }
            onChange={ props.onEndpointChange }
            onBlur={ props.onEndpointEditFinished }
        />
        <SaveRequestButton
            onSave={ props.onSave }
        />
        <StyledButton
            text='Send'
            size='m'
            onClick={ props.onSubmit }
        />
    </UrlBlock>
);
