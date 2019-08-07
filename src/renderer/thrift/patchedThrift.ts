import { Thrift } from 'thriftrw';
import Long from 'long';
import { I64RW, ThriftI64 } from 'thriftrw/i64';
import { ThriftEnum } from 'thriftrw/enum';
import errors from 'bufrw/errors';

export class I64LongRW extends I64RW {
    poolReadFrom(destResult: any, buffer: any, offset: number) {
        const value = Long.fromBits(
            buffer.readInt32BE(offset + 4, 4, true),
            buffer.readInt32BE(offset, 4, true)
        );
        return destResult.reset(null, offset + 8, value);
    }

    writeStringInt64Into(destResult: any, value: any, buffer: any, offset: number) {
        if (value.length !== 16) {
            buffer.writeInt32BE(0, offset);
            buffer.writeInt32BE(parseInt(value, 10), offset + 4);
            return destResult.reset(null, offset + 8);
        }

        const hi = parseInt(value.slice(0, 8), 16);
        if (hi !== hi) { // NaN
            return destResult.reset(errors.expected(value,
                'a string of hex characters, or other i64 representation'), null);
        }
        const lo = parseInt(value.slice(8, 16), 16);
        if (lo !== lo) { // NaN
            return destResult.reset(errors.expected(value,
                'a string of hex characters, or other i64 representation'), null);
        }

        buffer.writeInt32BE(hi, offset);
        buffer.writeInt32BE(lo, offset + 4);
        return destResult.reset(null, offset + 8);
    }
}

const i64LongRW = new I64LongRW();

// patched implementation of i64. It just always use Long as a surface of i64
export class ThriftI64Patched extends ThriftI64 {
    rw: any;
    surface: any;

    constructor(annotations: object) {
        super(annotations);
        this.rw = i64LongRW;
        this.surface = Long;
    }
}
Thrift.prototype.baseTypes = {
    ...Thrift.prototype.baseTypes,
    i64: ThriftI64Patched
};

// pathed enum. It allow us to use both string and numbers (and even numbers in strings) as enum value
export class BetterThriftEnum extends ThriftEnum {
    name: string = '';
    valuesToNames: {[key: string]: string} = {};
    namesToValues: {[key: string]: number} = {};
    compile(def: any, model: any) {
        ThriftEnum.prototype.compile.call(this, def, model);
        const values = Object.keys(this.valuesToNames);
        values.forEach(v => {
            this.namesToValues[v] = parseInt(v, 10);
        });
    }
}

Thrift.prototype.compileEnum = function compileEnum(def) {
    const model = new BetterThriftEnum();
    model.compile(def, this);
    this.define(model.name, def.id, model);
};

const originalCompileInclude = Thrift.prototype.compileInclude;

Thrift.prototype.compileInclude = function compileInclude(def) {
    if (def.id.lastIndexOf('./', 0) !== 0 && def.id.lastIndexOf('../', 0) !== 0) {
        def.id = `./${def.id}`;
    }
    originalCompileInclude.call(this, def);
};

export default Thrift;
