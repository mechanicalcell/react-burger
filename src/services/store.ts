import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './socket-middleware';
import thunkMiddleware from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './action-types';

const wsUrl = 'wss://norma.nomoreparties.space/';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions))) 
  );