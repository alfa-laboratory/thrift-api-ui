import React from 'react';
import styled from 'styled-components';
import Input from 'arui-feather/input';
import Label from 'arui-feather/label';
import { SelectedMethod } from '../reducers/editorReducer';

type Props = {
    isMultiplexerEnabled: boolean;
    onServiceNameChange: (value: SelectedMethod) => void;
    selectedMethod: SelectedMethod | null;
    className?: string;
};

const UrlBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const StyledInput = styled(Input)`
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

const StyledLabel = styled(Label)`
    && {
        color: #ffffff;
        margin-right: 10px;
    }
`;

export const MultiplexerEditor = ({ className, isMultiplexerEnabled, onServiceNameChange, selectedMethod }: Props) => {
    if (!isMultiplexerEnabled || !selectedMethod) return null;

    const handleServiceNameChange = (value: string) => {
        selectedMethod && onServiceNameChange({
            ...selectedMethod,
            modifiedServiceName: value,
        });
    };

    const serviceName = selectedMethod.hasOwnProperty('modifiedServiceName')
        ? selectedMethod.modifiedServiceName
        : selectedMethod.serviceName;

    return (
        <UrlBlock className={ className }>
            <StyledLabel size="s" isNoWrap={true}>Service Name:</StyledLabel>
            <StyledInput
                placeholder='Enter service name'
                width='available'
                view='filled'
                value={ serviceName }
                label='Service Name:'
                onChange={ handleServiceNameChange }
            />
        </UrlBlock>
    );
};
