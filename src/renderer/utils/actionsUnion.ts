import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

type FunctionType = (...args: any[]) => any; // eslint-disable-line typescript/no-explicit-any
type ActionCreatorsMap = { [actionCreator: string]: FunctionType };

export type ActionsUnion<A extends ActionCreatorsMap> = ReturnType<A[keyof A]>;

export type AppThunkAction<T extends Action, R = any> = ThunkAction<R, RootState, void, T>;
