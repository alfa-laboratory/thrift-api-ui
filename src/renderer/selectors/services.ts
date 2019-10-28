import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { FunctionAst, ServiceAst } from 'thriftrw';
import { getMethodDefaultRequest } from '../utils/defaultRequest';
import { getMethodJsonSchema } from '../utils/getMethodJsonSchema';
import { selectedMethodSelector } from './editor';
import { LoadingState } from '../utils/loadingState';

export const servicesStateSelector = (state: RootState) => state.services;

export const servicesSelector = createSelector(
    servicesStateSelector,
    state => state.services
);

export const astsSelector = createSelector(
    servicesStateSelector,
    state => state.asts
);

export const isThriftParsingInProgressSelector = createSelector(
    servicesStateSelector,
    state => state.loadingState === LoadingState.InProgress
);

export const isThriftParsedSelector = createSelector(
    servicesStateSelector,
    state => state.loadingState === LoadingState.Success
);

export const methodExecutorSelector = (state: RootState, serviceName: string, methodName: string) => {
    const services = servicesSelector(state);
    return services[serviceName][methodName];
};

export const methodsListSelector = createSelector(
    servicesSelector,
    services => Object
        .keys(services)
        .map(serviceName => ({
            name: serviceName,
            methods: Object.keys(services[serviceName])
        }))
        .reduce((prev, curr) => ({
            ...prev,
            [curr.name]: curr.methods
        }), {})
);

export const allServicesSelector = createSelector(
    astsSelector,
    asts => Object.values(asts).reduce((allServices, ast) => {
        ast.definitions.forEach(d => {
            if (d.type === 'Service') {
                allServices[d.id.name] = d;
            }
        });

        return allServices;
    }, {} as Record<string, ServiceAst>)
);

export const methodAstSelector = (
    state: RootState, serviceName: string, methodName: string
): FunctionAst | undefined => {
    const services = allServicesSelector(state);
    const serviceAst = services[serviceName];

    const ownMethod = serviceAst.functions.find(method => method.id.name === methodName)!;

    if (ownMethod) {
        return ownMethod;
    }

    if (serviceAst.baseService) {
        const baseServiceName = serviceAst.baseService.name.indexOf('.') !== -1
            ? serviceAst.baseService.name.split('.')[1]
            : serviceAst.baseService.name;
        return methodAstSelector(state, baseServiceName, methodName);
    }

    return undefined;
};

export const methodDefaultRequestSelector = createSelector(
    methodAstSelector,
    astsSelector,
    (methodAst, asts) => getMethodDefaultRequest(methodAst, asts)
);

export const methodJsonSchemaSelector = createSelector(
    methodAstSelector,
    astsSelector,
    (methodAst, asts) => getMethodJsonSchema(methodAst, asts)
);

export const currentMethodJsonSchema = createSelector(
    selectedMethodSelector,
    allServicesSelector,
    astsSelector,
    (selectedMethod, services, asts) => {
        if (!selectedMethod) {
            return null;
        }

        const serviceAst = services[selectedMethod.serviceName];
        const method = serviceAst.functions.find(method => method.id.name === selectedMethod.methodName)!;
        return getMethodJsonSchema(method, asts);
    }
);
