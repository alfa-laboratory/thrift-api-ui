import uuid from 'uuid/v4';
import { ActionsUnion, AppThunkAction } from '../utils/actionsUnion';
import { SavedRequestEntry } from '../utils/savedRequests';
import { endpointSelector, requestSelector, selectedMethodSelector } from '../selectors/editor';
import { savedEntriesSelector } from '../selectors/savedRequests';

export const SAVE_REQUEST = '@savedRequests/save';
export const DELETE_REQUEST = '@savedRequests/delete';

const historyAc = {
    saveRequest(
        id: string,
        entry: SavedRequestEntry
    ) {
        return {
            type: SAVE_REQUEST,
            id,
            entry
        } as const;
    },
    deleteRequest(id: string) {
        return {
            type: DELETE_REQUEST,
            id
        } as const;
    }
};

export type HistoryActionTypes = ActionsUnion<typeof historyAc>;
type HistoryThunkAction = AppThunkAction<HistoryActionTypes>;

export function saveRequest(name: string): HistoryThunkAction {
    return (dispatch, getState) => {
        const state = getState();
        const methodName = selectedMethodSelector(state);
        const request = requestSelector(state);
        const endpoint = endpointSelector(state);

        if (!methodName) {
            return;
        }

        const id = uuid();

        dispatch(historyAc.saveRequest(id, {
            id,
            name,
            serviceName: methodName.serviceName,
            methodName: methodName.methodName,
            request,
            endpoint,
            timestamp: Date.now()
        }));
    };
}

export const deleteRequest = historyAc.deleteRequest;
