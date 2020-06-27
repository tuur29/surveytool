/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"
import { LogicMiddleware } from "./logic";
import { answersReducer, initialAnswersState, AnswersActions } from "./answersReducer";
import { configReducer, initialConfigState, ConfigActions } from "./configReducer";

const rootReducer = combineReducers({
    answers: answersReducer,
    config: configReducer,
});

const initialState = {
    answers: initialAnswersState,
    config: initialConfigState,
};

const middlewareEnhancer = applyMiddleware(LogicMiddleware);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);
const store = createStore(rootReducer, initialState, composedEnhancers);

export type StateType = typeof initialState;
export type ActionsType = AnswersActions | ConfigActions;
export const useStore: TypedUseSelectorHook<StateType> = useSelector;
export const useStoreDispatch: () => Dispatch<ActionsType> = useDispatch;

export default store;
