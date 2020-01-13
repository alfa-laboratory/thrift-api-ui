import React from 'react';
import CheckBox from 'arui-feather/checkbox';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import styled from 'styled-components';
import Spin from 'arui-feather/spin';
import { Modal } from './Modal';

type Props = {
    isMultiplexerEnabled: boolean;
    isProxyEnabled: boolean;
    proxyUrl?: string;
    thriftSrcPath?: string;
    requestTimeout: number;
    isThriftParsingInProgress: boolean;
    isOpened: boolean;
    onClose: () => void;
    onIsMultiplexerEnabledChange: (value: boolean) => void;
    onIsProxyEnabledChange: (value: boolean) => void;
    onProxyUrlChange: (value: string) => void;
    onRequestTimeoutChange: (value: number) => void;
    onChangePathClick: () => void;
    className?: string;
    version?: string;
};

const StyledSettings = styled.div`
    width: 400px;
`;

const SettingsRow = styled.div`
    padding-bottom: 14px;
`;

export const Settings = (props: Props) => {
    const onRequestTimeoutChange = React.useCallback(
        (value: string) => props.onRequestTimeoutChange(parseInt(value, 10)),
        [props.onRequestTimeoutChange]
    );

    return (
        <Modal
            isVisible={ props.isOpened }
            isClosable={ !props.isThriftParsingInProgress }
            onClose={ props.onClose }
            className={ props.className }
        >
            <StyledSettings>
                <SettingsRow>
                    <CheckBox
                        text='Enable multiplexed protocol'
                        checked={ props.isMultiplexerEnabled }
                        onChange={ props.onIsMultiplexerEnabledChange }
                    />
                </SettingsRow>
                <SettingsRow>
                    <CheckBox
                        text='Enable proxy'
                        checked={ props.isProxyEnabled }
                        onChange={ props.onIsProxyEnabledChange }
                    />
                </SettingsRow>
                <SettingsRow>
                    <Input
                        label='Proxy url'
                        value={ props.proxyUrl || '' }
                        disabled={ !props.isProxyEnabled }
                        onChange={ props.onProxyUrlChange }
                        width='available'
                    />
                </SettingsRow>
                <SettingsRow>
                    <Input
                        type='number'
                        label='Request timeout'
                        value={ props.requestTimeout.toString(10) }
                        onChange={ onRequestTimeoutChange }
                        width='available'
                    />
                </SettingsRow>
                <SettingsRow>
                    <Input
                        label='Thrift src path'
                        disabled={ true }
                        value={ props.thriftSrcPath }
                        width='available'
                    />
                </SettingsRow>
                <SettingsRow>
                    <Button
                        text='Change thrift src path'
                        icon={ <Spin visible={ props.isThriftParsingInProgress } /> }
                        onClick={ props.onChangePathClick }
                        disabled={ props.isThriftParsingInProgress }
                    />
                </SettingsRow>
                { `Version: ${props.version}` }
            </StyledSettings>
        </Modal>
    );
};
