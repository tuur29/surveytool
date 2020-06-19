/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "react";
import { createStore, combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"
import { AnswersActions, answersReducer, initialAnswersState } from "./answersReducer";

const rootReducer = combineReducers({
    answers: answersReducer
});

const initialState = {
    answers: initialAnswersState,
};

const store = createStore(rootReducer, undefined, composeWithDevTools());

export type StateType = typeof initialState;
export type ActionsType = AnswersActions;
export const useStore: TypedUseSelectorHook<StateType> = useSelector;
export const useStoreDispatch: () => Dispatch<ActionsType> = useDispatch;

export default store;
