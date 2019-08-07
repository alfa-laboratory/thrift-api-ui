import * as fs from 'fs';
import PatchedThrift from './patchedThrift';

// thriftrw пытается считать файлы в ascii кодировке. У нас они в utf8.
const patchedFs = {
    ...fs,
    readFileSync(filename: string) {
        return fs.readFileSync(filename, 'utf8')
    }
};

/**
 * Возвращает AST thrift файла.
 */
export function parseFile(filename: string) {
    return new PatchedThrift({
        entryPoint: filename,
        fs: patchedFs,
        strict: false,
        allowOptionalArguments: true,
        defaultAsUndefined: false
    });
}
