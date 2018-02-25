import {CHANGE_AUTH,AUTH_USER,UNAUTH_USER} from '../actions/type';
const auth=(state=false,action)=>{
	switch(action.type){
		case CHANGE_AUTH:
		return action.payload;
		case AUTH_USER:
		return true;
		case UNAUTH_USER:
		return false;
		default:
		return state;
	}
}

export default auth;

export const getAuth=(state)=>(state)