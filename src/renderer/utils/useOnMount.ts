import { EffectCallback, useEffect } from 'react';

export function useOnMount(fn: EffectCallback) {
    return useEffect(fn, []);
}
