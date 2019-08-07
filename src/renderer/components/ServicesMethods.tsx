import Heading from 'arui-feather/heading';
import Menu from 'arui-feather/menu';
import React from 'react';

type Props = {
    searchString: string;
    services: Record<string, string[]>;
    onMethodSelect: (serviceName: string, methodName: string) => void;
};

export const ServicesMethods = (props: Props) => {
    const loweredSearchString = props.searchString.toLocaleLowerCase();
    const serviceToMenuContent = (serviceName: string) =>
        ({
            type: 'group' as const,
            title: serviceName,
            content: props.services[serviceName]
                .filter((methodName) => {
                    if (!props.searchString) {
                        return true;
                    }

                    return (
                        methodName.toLocaleLowerCase().includes(loweredSearchString) ||
                        serviceName.toLocaleLowerCase().includes(loweredSearchString)
                    );
                })
                .map(methodName => (
                {
                    type: 'item',
                    content: methodName,
                    value: `${ serviceName }/${ methodName }`,
                    props: {
                        url: `${ serviceName }/${ methodName }`,
                        onClick: (event: MouseEvent) => {
                            event.preventDefault();
                            props.onMethodSelect(serviceName, methodName);
                        }
                    }
                }
                ))
        });

    const menuContent = Object.keys(props.services)
        .filter((serviceName) => {
            if (!props.searchString) {
                return true;
            }

            return serviceName.toLocaleLowerCase().includes(loweredSearchString) ||
                props.services[serviceName]
                    .some(methodName => methodName.toLocaleLowerCase().includes(loweredSearchString));
        })
        .map(serviceToMenuContent);

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
