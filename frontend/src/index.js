import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore} from "redux";

const defaultState = {

}

const reducer = (state, action) => {
  switch (action.type) {

    default:
      return state;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);