import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initStore } from './services/store'
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TProfileActions } from './services/actions/get-patch';
import { TLoginActions } from './services/actions/login';
import { TIngredientActions } from './services/actions';
import { TOrderActions } from './services/actions/order';
import { TCopyArrActions } from './services/actions/copy-arr';
import { TUserRegistrationActions } from './services/actions/user-registration';
import { TPasswordResetActions } from './services/actions/password-reset';
import { TNewPasswordActions } from './services/actions/new-password';
import { TCountActions } from './services/actions/count';

const store = initStore();

type TApplicationActions = 
  | TProfileActions
  | TLoginActions
  | TIngredientActions
  | TOrderActions
  | TCopyArrActions
  | TUserRegistrationActions
  | TPasswordResetActions
  | TNewPasswordActions
  | TCountActions;

export type RootState = ReturnType<typeof store.getState>;
                                   
export type AppDispatch = typeof store.dispatch;
 
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
