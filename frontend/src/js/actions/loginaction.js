import axios from 'axios';


export const LOGIN = "login_success";
export const LOGIN_ERROR = "login_error";

function Suc(response) {
    console.log("Response inside login action" , response)
    return {
        type: LOGIN,
        payload: response
    }
}


function Err(response) {
    return {
      type: LOGIN_ERROR,
      payload: response
    };
}
function login(values) {
    console.log("Login Actions Values",values)
    //middleware call
    //receive response from backend
    return function (dispatch) {
        
        
        axios.post('http://localhost:3001/login', values, { withCredentials: true }).then(res => {
            dispatch(
                Suc(res)
            )
        }).catch(error => {
            dispatch(Err(error))
        })
    }


}

export default login;