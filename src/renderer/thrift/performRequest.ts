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
        timeout,
        proxy
    });

    const res = await promise;
    const parsed = method.resultMessageRW.readFrom(res, 0);
    if (parsed.err) {
        throw parsed.err;
    }
    if (parsed.value.body.success) {
        return JSON.stringify(parsed.value.body.success, jsonNormalizerFilter, 4);
    }
    throw JSON.stringify(parsed.value.body.e || parsed.value.body, jsonNormalizerFilter, 4);
}
