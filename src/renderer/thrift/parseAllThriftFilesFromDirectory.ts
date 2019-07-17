import { readDirRecursive } from '../utils/readDirRecursive';
import { parseFile } from './parser';
import { ParsedService, ProgramAst } from 'thriftrw';

export async function parseAllThriftFilesFromDirectory(directory: string) {
    const allFiles = await readDirRecursive(directory);

    const promises = allFiles
        .filter(f => f.match(/.*\.thrift$/))
        .map(f => parseFile(f));

    const allResults = await Promise.all(promises);

    const asts: Record<string, ProgramAst> = {};
    const services: Record<string, ParsedService> = {};

    allResults.forEach(parsedThrift => {
        Object.keys(parsedThrift.asts).forEach(filename => {
            asts[filename] = parsedThrift.asts[filename];
        });
        Object.keys(parsedThrift.services).forEach(serviceName => {
            services[serviceName] = parsedThrift.services[serviceName];
        });
    });

    return {
        asts,
        services
    };
}
