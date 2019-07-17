import Long from 'long';

export function jsonNormalizerFilter(key: string, value: any): any {
    if (Long.isLong(value)) {
        if (value.gt(Number.MAX_SAFE_INTEGER)) {
            console.warn(`i64 in ${key} field is bigger then safe integer`);
        }

        return value.toNumber();
    }

    return value;
}
