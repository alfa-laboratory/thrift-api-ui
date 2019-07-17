import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readDir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Рекурсивно считывает содержимое папки и возвращает список файлов.
 */
export async function readDirRecursive(directory: string) {
    const directoryContent = await readDir(directory);

    const files: string[] = [];

    const promises = directoryContent.map(async (name) => {
        const fullName = path.join(directory, name);
        const stats = await stat(fullName);
        if (!stats.isDirectory()) {
            files.push(fullName);
            return true;
        }

        const otherFiles = await readDirRecursive(fullName);
        files.push(...otherFiles);
        return true;
    });

    await Promise.all(promises);

    return files;
}
