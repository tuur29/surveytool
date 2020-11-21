/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, combineReducers, MiddlewareAPI, Dispatch } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { middlewares } from "./storeMiddleware";
import { listeners } from "./storeListener";
import { answersReducer, initialAnswersState } from "./reducers/answersReducer";
import { AnswersActions } from "./actions/answersActions";
import { configReducer, initialConfigState } from "./reducers/configReducer";
import { ConfigActions } from "./actions/configActions";
import { resultReducer, initialResultState } from "./reducers/resultReducer";
import { ResultActions } from "./actions/resultActions";
import { messagesReducer, initialMessagesState } from "./reducers/messagesReducer";
import { MessagesActions } from "./actions/messagesActions";

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
