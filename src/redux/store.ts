/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, combineReducers, MiddlewareAPI, Dispatch, Store } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch, useStore } from "react-redux";
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

export const initialStoreState = {
    answers: initialAnswersState,
    config: initialConfigState,
    result: initialResultState,
    messages: initialMessagesState,
};

export type StateType = typeof initialStoreState;
export type ActionsType = AnswersActions | ConfigActions | ResultActions | MessagesActions;
export type StoreApiType = MiddlewareAPI<Dispatch<ActionsType>, StateType>;
export type StoreType = Store<StateType, ActionsType>;

export const useStoreSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useStoreDispatch: () => Dispatch<ActionsType> = useDispatch;
export const useTypedStore: () => StoreType = useStore;

const createNewStore = (): StoreType => {
    const enhancers = composeWithDevTools(middlewares);
    const store = createStore(rootReducer, initialStoreState, enhancers);
    listeners.forEach((listener) => store.subscribe(() => listener(store)));
    return store;
};

export default createNewStore;
