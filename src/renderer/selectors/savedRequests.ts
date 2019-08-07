import { RootState } from '../reducers';
import { createSelector } from 'reselect';

export const savedRequestsStateSelector = (state: RootState) => state.savedRequests;

export const savedListSelector = createSelector(
    savedRequestsStateSelector,
    savedRequest => savedRequest.list
);

export const savedEntriesSelector = createSelector(
    savedRequestsStateSelector,
    savedRequests => savedRequests.entries
);

export const savedRequestsSelector = createSelector(
    savedListSelector,
    savedEntriesSelector,
    (list, entries) => list.map(id => entries[id])
);
