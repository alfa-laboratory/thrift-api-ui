import {
    AllActions,
    SAVE_REQUEST,
    DELETE_REQUEST
} from '../actions';
import { SavedRequestEntry } from '../utils/savedRequests';

export type HistoryState = {
    list: string[];
    entries: {
        [id: string]: SavedRequestEntry;
    }
};

const initialState: HistoryState = {
    list: [],
    entries: {}
};

export function savedRequestsReducer(state: HistoryState = initialState, action: AllActions): HistoryState {
    switch (action.type) {
        case SAVE_REQUEST:
            return {
                ...state,
                list: [...state.list, action.id],
                entries: {
                    ...state.entries,
                    [action.id]: action.entry
                }
            };
        case DELETE_REQUEST:
            const entries = { ...state.entries };
            delete entries[action.id];

            return {
                ...state,
                list: state.list.filter(id => id !== action.id),
                entries
            };
        default:
            return state;
    }
}
