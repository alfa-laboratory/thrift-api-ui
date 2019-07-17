import { Definitions, FieldAst, FunctionAst, ProgramAst } from 'thriftrw';
import { resolveType } from './astHelpers';

export function getMethodJsonSchema(methodDefinition: FunctionAst, thriftDefinitions: Record<string, ProgramAst>) {
    return getObjectSchema(methodDefinition, thriftDefinitions)
}

function getObjectSchema(
    methodAst: FunctionAst | Definitions,
    thriftDefinitions: Record<string, ProgramAst>
) {
    const obj: any = {
        type: 'object',
        title: methodAst.id.name,
        properties: {}
    };
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
        obj.properties[f.name] = getFieldSchema(f, thriftDefinitions);
    });
    return obj;
}

function getFieldSchema(fieldAst: FieldAst, thriftDefinitions: Record<string, ProgramAst>) {
    switch (fieldAst.valueType.type) {
        case 'BaseType':
            switch (fieldAst.valueType.baseType) {
                case 'string':
                    return { type: 'string' };
                case 'i32':
                case 'i64':
                case 'double':
                case 'float':
                    return { type: 'number' };
                case 'bool':
                    return { type: 'boolean' };
                case 'binary':
                    return { type: 'string' };
            }
            break;
        case 'Identifier':
            const type = resolveType(fieldAst.valueType.name, thriftDefinitions);
            if (type.type === 'Enum') {
                return {
                    type: 'string',
                    enum: type.definitions.map(d => d.id.name)
                };
            }

            return getObjectSchema(type, thriftDefinitions);
        case 'Map':
        case 'Set':
            return {}; // TODO
        case 'List':
            return {
                type: 'array', // TODO
            };
    }
}
