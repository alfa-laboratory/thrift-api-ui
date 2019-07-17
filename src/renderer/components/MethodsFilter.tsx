import React from 'react';
import Menu from 'arui-feather/menu';
import Input from 'arui-feather/input';
import Heading from 'arui-feather/heading';

type Props = {
    services: Record<string, string[]>;
    onMethodSelect: (serviceName: string, methodName: string) => void;
    className?: string;
};

export const MethodsFilter = React.memo((props: Props) => {
    const [searchString, setSearchString] = React.useState('');
    const loweredSearchString = searchString.toLocaleLowerCase();

    const serviceToMenuContent = (serviceName: string) => ({
        type: 'group' as const,
        title: serviceName,
        content: props.services[serviceName]
            .filter((methodName) => {
                if (!searchString) {
                    return true;
                }

                return (
                    methodName.toLocaleLowerCase().includes(loweredSearchString) ||
                    serviceName.toLocaleLowerCase().includes(loweredSearchString)
                );
            })
            .map(methodName => ({
                type: 'item',
                content: methodName,
                value: `${serviceName}/${methodName}`,
                props: {
                    url: `${serviceName}/${methodName}`,
                    onClick: (event: MouseEvent) => {
                        event.preventDefault();
                        props.onMethodSelect(serviceName, methodName);
                    }
                }
            }))
    });
    const menuContent = Object.keys(props.services)
        .filter((serviceName) => {
            if (!searchString) {
                return true;
            }

            return serviceName.toLocaleLowerCase().includes(loweredSearchString) ||
                props.services[serviceName]
                    .some(methodName => methodName.toLocaleLowerCase().includes(loweredSearchString));
        })
        .map(serviceToMenuContent);

    return (
        <div className={ props.className }>
            <Input
                value={ searchString }
                onChange={ setSearchString }
                width='available'
                view='filled'
                label='Find method'
            />
            { menuContent.length === 0 && (
                <Heading size='xs'>
                    Nothing matched
                </Heading>
            ) }
            <Menu
                content={ menuContent }
            />
        </div>
    );
});
