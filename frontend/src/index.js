import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
 


import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../src/js/reducers/loginReducer";
//import registerServiceWorker from './registerServiceWorker';

//render App component on the root element
const composePlugin = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStore(loginReducer, composePlugin(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
        <App /></Provider>, document.getElementById("root"));
//registerServiceWorker();

serviceWorker.unregister();