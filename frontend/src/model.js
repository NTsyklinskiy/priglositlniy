import { async } from "regenerator-runtime";
import {API_URL, RES_PER_PAGE} from './config.js'
import { AJAX } from "./helper.js";

export const state = {
  user:{
    id: '',
    token: '',
    lastName: '',
    firstName: '',
    options: '',
  }
};

export const init = function() {
  const storageUser = localStorage.getItem('user');
  if(storageUser){
    state.user = JSON.parse(storageUser);
  }
} 
init()



export const signIn = async function(user) {
  try{
    const data = await AJAX(`${API_URL}priglos/login`, user);
    console.log(data);
    state.user = {
      token: data.token,
      id: data.data.user._id,
      firstName: data.data.user.firstName,
      lastName: data.data.user.lastName,
      options: data.data.user.options,
    }
    UserInfo()
    
  } catch(err) {
    throw err;
  }
}

export const UserInfo = function(){
  localStorage.setItem('user',JSON.stringify(state.user));
};

