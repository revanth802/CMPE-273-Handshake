import cookie from 'react-cookies';

const loginReducer = (state = {}, action) => {
    let newState = { ...state };
    console.log("----------In Login Reducer" + action.type);
   
        if (action.type === "login_success") {
            console.log("-----123----");
            let temp = JSON.stringify(action);
            temp = JSON.parse(temp);
            newState.status = temp.payload.status;
           
    
        } else if (action.type === "login_error") {
            let temp = JSON.stringify(action);
            temp = JSON.parse(temp);
            console.log("temp error", temp);
            newState.status = temp.payload.response.status;
    
        }
    
    return newState;
};

export default loginReducer;