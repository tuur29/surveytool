/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, combineReducers, MiddlewareAPI, Dispatch } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { middlewares } from "./storeMiddleware";
import { answersReducer, initialAnswersState, AnswersActions } from "./answersReducer";
import { configReducer, initialConfigState, ConfigActions } from "./configReducer";
import { resultReducer, initialResultState, ResultActions } from "./resultReducer";
import { messagesReducer, initialMessagesState, MessagesActions } from "./messagesReducer";
import { listeners } from "./storeListener";

const rootReducer = combineReducers({
    answers: answersReducer,
    config: configReducer,
    result: resultReducer,
    messages: messagesReducer,
});

const initialState = {
    answers: initialAnswersState,
    config: initialConfigState,
    result: initialResultState,
    messages: initialMessagesState,
};

const enchancers = composeWithDevTools(middlewares);
const store = createStore(rootReducer, initialState, enchancers);
listeners.forEach((listener) => store.subscribe(() => listener(store)));

export type StateType = typeof initialState;
export type ActionsType = AnswersActions | ConfigActions | ResultActions | MessagesActions;
export type StoreType = MiddlewareAPI<Dispatch<ActionsType>, StateType>;

export const useStoreSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useStoreDispatch: () => Dispatch<ActionsType> = useDispatch;

export default store;
