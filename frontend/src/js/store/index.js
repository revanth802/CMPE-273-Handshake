import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../../components/combine";
import thunk from "redux-thunk";
//import { forbiddenWordsMiddleware } from "../middleware/index";

// const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, (applyMiddleware(thunk)));

    
    

    export default store;