import { SAVE_EXPERIENCE,FETCH_PROFILE, SAVE_STUD_OBJECT, SAVE_EDUCATION, DELETE_EDUCATION, DELETE_EXPERIENCE,LOGIN,REGISTER} from "../constants/action-types";
import axios from 'axios';
import cookie from 'react-cookies';
import {backend} from "../../config";

export function fetchProfile(payload) {
  console.log("dispatching the action")
  return function(dispatch){
    axios.get(backend+'/profile/'+payload)
                .then((response) => dispatch({
                  type:FETCH_PROFILE,
                  payload : response.data
                }));
                
  } 
}


export function saveExperience(payload){
  return function(dispatch){
    console.log('payload::', payload);
    axios.put(backend+'/profile/editExperience/:'+ payload[0].student_exp_id , payload)
              .then((response)=> dispatch({
                  type: SAVE_EXPERIENCE,
                  payload : response
              }));
              dispatch(fetchProfile(payload[0].fk_student_id))
  }    
}

export function saveEducation(payload){
  return function(dispatch){
    axios.put(backend+'/profile/editEducation/:'+payload[0].student_education_id, payload)
              .then((response)=>dispatch({
                type: SAVE_EDUCATION,
                payload: response
              }));
              dispatch(fetchProfile(payload[0].fk_student_id))
            }
  }



export function saveStudentObject(payload){

  return function(dispatch){
    axios.put(backend+'/profile/editstudentObject/:'+payload[0].student_id, payload)
              .then((response)=>dispatch({
                type: SAVE_STUD_OBJECT,
                payload : response
              }));
                  
              
              dispatch(fetchProfile(payload[0].student_id))
  }
}

export function deleteExperience(payload){

  return function(dispatch){
    axios.delete(backend+'/profile/deleteExperience/'+payload)
    .then((response) => dispatch({
      type : DELETE_EXPERIENCE, 
      payload : response

    }));
    dispatch(fetchProfile(cookie.load('cookie')))
  }
  
}

export function deleteEducation(payload){

  return function(dispatch){
    axios.delete(backend+'/profile/deleteEducation/'+payload)
    .then((response) => dispatch({
      type : DELETE_EDUCATION, 
      payload : response

    }));
    dispatch(fetchProfile(cookie.load('cookie')))
  }

}

export function auth(payload){

  return async function(dispatch){
   await axios.post(backend+'/auth',payload)
    .then((response) => dispatch({
      type : LOGIN, 
      payload : response

    }));
    //dispatch(fetchProfile(1))
  }

}


export  function register(payload){

  return async function(dispatch){
    await axios.post(backend+'/register',payload)
    .then((response) =>  dispatch({
      type : REGISTER, 
      payload : response

    }));
    //dispatch(fetchProfile(1))
  }

}