import Heading from 'arui-feather/heading';
import Menu from 'arui-feather/menu';
import styled from 'styled-components';
import React from 'react';
import { MenuItem } from './MenuItem';
import { SelectedMethod } from '../reducers/editorReducer';

type Props = {
    searchString: string;
    services: Record<string, string[]>;
    selectedMethod: SelectedMethod | null;
    onMethodSelect: (serviceName: string, methodName: string) => void;
};

const StyledGroup = styled.div`
    margin-bottom: 16px;
`;

const StyledGroupTitle = styled.div`
    margin-bottom: 8px;
    line-height: 1.4;
    font-size: 13px;
`;

const checkIfMethodIsSelected = (serviceName: string, methodName: string, selectedMethod: SelectedMethod | null) => (
    !!selectedMethod
        && selectedMethod.serviceName === serviceName
        && selectedMethod.methodName === methodName
);

export const ServicesMethods = (props: Props) => {

    const loweredSearchString = props.searchString.toLocaleLowerCase();

    const menu: JSX.Element[] = [];

    Object.keys(props.services).forEach(serviceName => {
        if (!loweredSearchString || serviceName.toLowerCase().includes(loweredSearchString)) {
            menu.push(
                <StyledGroup key={ serviceName }>
                    <StyledGroupTitle>{ serviceName }</StyledGroupTitle>
                    {
                        props.services[serviceName].map(method => (
                            <MenuItem
                                key={ method }
                                isSelected={ checkIfMethodIsSelected(serviceName, method, props.selectedMethod) }
                                service={ serviceName }
                                method={ method }
                                onClick={ props.onMethodSelect }
                            />
                        ))
                    }
                </StyledGroup>
            );
        } else {
            const methods: JSX.Element[] = [];

            props.services[serviceName].forEach(method => {
                if (method.toLowerCase().includes(loweredSearchString)) {
                    methods.push(
                        <MenuItem
                            key={ method }
                            isSelected={ checkIfMethodIsSelected(serviceName, method, props.selectedMethod) }
                            service={ serviceName }
                            method={ method }
                            onClick={ props.onMethodSelect }
                        />
                    );
                }
            });

            if (methods.length) {
                menu.push(
                    <StyledGroup key={ serviceName }>
                        <StyledGroupTitle>{ serviceName }</StyledGroupTitle>
                        { methods }
                    </StyledGroup>
                );
            }
        }
    });

    return menu.length ? <>{ menu }</> : (
        <Heading size='xs'>
            Nothing matched
        </Heading>
    )
};
