import request from 'request-promise-native';
import { ParsedMethod } from 'thriftrw';
import { jsonNormalizerFilter } from '../utils/thriftJsonNormalizer';

interface PerformRequestParameters {
    method: ParsedMethod;
    messageName: string;
    endpoint: string;
    requestMessage: string;
    timeout: number;
    proxy?: string;
}

const stringify = (data: any) => JSON.stringify(data, jsonNormalizerFilter, 4);

export async function performRequest(
    { method, messageName, endpoint, requestMessage, timeout, proxy }: PerformRequestParameters
) {
    const params = JSON.parse(requestMessage);
    const message = new method.ArgumentsMessage({
        id: 0,
        body: new method.Arguments(params),
        name: messageName
    });

    const result = method.argumentsMessageRW.byteLength(message);
    const buffer = new Buffer(result.length);

    method.argumentsMessageRW.writeInto(message, buffer, 0);

    const promise = request({
        method: 'POST',
        uri: endpoint,
        body: buffer,
        encoding: null,
        headers: {
            'Content-Type': 'application/x-thrift',
        },
        timeout,
        proxy
    });

    const res = await promise;
    const parsed = method.resultMessageRW.readFrom(res, 0);
    if (parsed.err) {
        throw stringify(parsed.err);
    }
    if (parsed.value.body.success) {
        return stringify(parsed.value.body.success);
    }
    throw stringify(parsed.value.body.e || parsed.value.body);
}
