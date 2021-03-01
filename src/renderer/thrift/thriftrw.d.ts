/**
 * Partial typings for thriftrw package, types only for directly used methods
 */

declare module 'thriftrw' {
    type ThriftOptions = {
        entryPoint: string;
        fs: object;
        strict: boolean;
        allowOptionalArguments: boolean;
        defaultAsUndefined: boolean;
    };

    export interface ProgramAst {
        type: 'Program';
        headers: Headers[];
        definitions: Definitions[];
    }

    export interface Identifier {
        type: 'Identifier';
        name: string;
        line?: number;
        column?: number;
    }

    export interface IncludeAst {
        type: 'Include';
        id: string;
        line?: number;
        column?: number;
        namespace?: NamespaceAst;
    }

    export interface NamespaceAst {
        type: 'Namespace';
        id: Identifier;
        scope: string;
    }

    export interface TypedefAst {
        type: 'Typedef';
        id: Identifier;
        valueType: AnyType;
        annotations?: TypeAnnotation[] | {};
    }

    export interface BaseType {
        type: 'BaseType';
        baseType: 'string' | 'i16' | 'i32' | 'i64' | 'double' | 'float' | 'bool' | 'void' | 'binary';
        annotations?: TypeAnnotation[] | {};
    }

    export interface EnumAst {
        type: 'Enum';
        id: Identifier;
        definitions: EnumDefinitionAst[];
        annotations?: TypeAnnotation[] | {};
    }

    export interface EnumDefinitionAst {
        type: 'EnumDefinition';
        id: Identifier;
        fieldType: BaseType;
        value: number;
        annotations?: TypeAnnotation[] | {};
    }

    export interface Senum {
        type: 'Senum';
        id: Identifier;
        senumDefinitions: EnumDefinitionAst[];
        annotations?: TypeAnnotation[] | {};
    }

    export interface ConstAst {
        type: 'Const';
        id: Identifier;
        fieldType: AnyType;
        value: Literal | ConstMap | ConstList;
    }

    export interface ConstMap {
        type: 'ConstMap';
        entries: ConstEntry[];
    }

    export interface ConstEntry {
        type: 'ConstEntry';
        key: Literal;
        value: Literal;
    }

    export interface ConstList {
        type: 'ConstList';
        values: Literal[];
    }

    export interface StructAst {
        type: 'Struct';
        id: Identifier;
        fields: FieldAst[];
        isResult?: boolean;
        isArgument?: boolean;
        annotations?: TypeAnnotation[] | {};
    }

    export interface UnionAst {
        type: 'Union';
        id: Identifier;
        fields: FieldAst[];
        isResult?: boolean;
        isArgument?: boolean;
        annotations?: TypeAnnotation[] | {};
    }

    export interface ExceptionAst {
        type: 'Exception';
        id: Identifier;
        fields: FieldAst[];
        annotations: TypeAnnotation[] | {};
    }

    export type StructureLikeAst = ExceptionAst | StructAst | UnionAst;

    export interface ServiceAst {
        type: 'Service';
        id: Identifier;
        baseService?: Identifier;
        functions: FunctionAst[];
        annotations?: TypeAnnotation[] | {};
    }

    export interface FunctionAst {
        type: 'Function';
        id: Identifier;
        oneway?: boolean;
        throws: null | FieldAst[];
        fields: FieldAst[];
        returns: AnyType;
        annotations?: TypeAnnotation[] | {};
    }

    export interface FieldAst {
        type: 'Field';
        id: Identifier;
        name: string;
        'default'?: string | number;
        optional: boolean;
        required: boolean;
        valueType: AnyType;
        annotations?: TypeAnnotation[] | {};
    }

    export interface FieldIdentifier {
        type: 'FieldIdentifier';
        value: string;
        line?: number;
        column?: number;
    }

    export interface MapType {
        type: 'Map';
        keyType: AnyType;
        valueType: AnyType;
        annotations?: TypeAnnotation[] | {};
    }

    export interface SetType {
        type: 'Set';
        valueType: AnyType;
        annotations?: TypeAnnotation[] | {};
    }

    export interface ListType {
        type: 'List';
        valueType: BaseType | Identifier;
        annotations?: TypeAnnotation[] | {};
    }

    export interface TypeAnnotation {
        type: 'TypeAnnotation';
        name: string;
        value: string;
    }

    export interface Comment {
        type: 'Comment';
        value: string;
    }

    export interface Literal {
        type: 'Literal';
        value: string | number;
    }

    export type AnyType = BaseType | Identifier | ListType | MapType | SetType;
    export type Headers = NamespaceAst | IncludeAst;
    export type ModelsDefinitions = StructAst | EnumAst | ExceptionAst | UnionAst | ConstAst | TypedefAst;
    export type Definitions = ModelsDefinitions | ServiceAst;

    class ArgumentsMessage {
        constructor(...args: any[])
    }


    type ParsedMethod = {
        ArgumentsMessage: { new(...args: any): any }
        Arguments: { new(...args: any[]):any; }
        argumentsMessageRW: {
            byteLength: (message: any) => any[];
            writeInto: (message: any, buffer: Buffer, offset: number) => void;
        };
        resultMessageRW: {
            readFrom: (source: any, offset: number) => any;
        }
    }

    export type ParsedService = Record<string, ParsedMethod>;

    export class Thrift {
        constructor(options?: ThriftOptions);

        services: { [serviceName: string]: ParsedService };

        asts: { [filename: string]: ProgramAst };

        baseTypes: { [key: string]: object };

        compileEnum(definition: { id: string }): void;

        compileInclude(definition: { id: string }): void;

        define(name: string, id: string, model: object): void;
    }
}

declare module 'thriftrw/enum' {
    export class ThriftEnum {
        name: string;
        valuesToNames: {[key: string]: string};
        namesToValues: {[key: string]: number};
        constructor(annotations?: object);
        compile(definition: object, model: object): void;
    }
}

declare module 'thriftrw/i64' {
    export class I64RW {}

    export class ThriftI64 {
        constructor(annotations: object);
        compile(definition: object, model: object): void;
    }
}

declare module 'bufrw/errors' {
    export function expected(...args: any[]): any;
}
