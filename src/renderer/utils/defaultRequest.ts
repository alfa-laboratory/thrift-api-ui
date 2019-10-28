import { Definitions, FieldAst, FunctionAst, ProgramAst } from 'thriftrw';
import { resolveType } from './astHelpers';

export function getMethodDefaultRequest(
    methodDefinition: FunctionAst | undefined, thriftDefinitions: Record<string, ProgramAst>
) {
    return JSON.stringify(getDefaultObjectValue(methodDefinition, thriftDefinitions), null, 4);
}

function getDefaultObjectValue(
    methodAst: FunctionAst | Definitions | undefined,
    thriftDefinitions: Record<string, ProgramAst>
) {
    if (!methodAst) {
        return '';
    }

    const obj: any = {};
    if (methodAst.type === 'Enum') {
        return '';
    }
    if (methodAst.type === 'Const') {
        return '';
    }
    if (methodAst.type === 'Typedef') {
        return '';
    }
    if (methodAst.type === 'Service') {
        return '';
    }
    methodAst.fields.forEach((f) => {
        obj[f.name] = getDefaultValue(f, thriftDefinitions);
    });
    return obj;
}

function getDefaultValue(fieldAst: FieldAst, thriftDefinitions: Record<string, ProgramAst>) {
    switch (fieldAst.valueType.type) {
        case 'BaseType':
            switch (fieldAst.valueType.baseType) {
                case 'string':
                    return '';
                case 'i32':
                case 'i64':
                case 'double':
                case 'float':
                    return 0;
                case 'bool':
                    return false;
                case 'binary':
                    return '';
            }
            break;
        case 'Identifier':
            const type = resolveType(fieldAst.valueType.name, thriftDefinitions);
            if (type.type === 'Enum') {
                return `${type.definitions[0].id.name}`;
            }

            return getDefaultObjectValue(type, thriftDefinitions);
        case 'List':
            return [];
    }
}
