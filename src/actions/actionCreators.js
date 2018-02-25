import {v4} from 'node-uuid'
import * as api from '../utility/localStorage'
import {getIsFetching,getTodo} from '../reducers'
import {normalize} from 'normalizr'
import * as schema from './schema'
import {CHANGE_AUTH,AUTH_USER,UNAUTH_USER} from './type'
import axios from 'axios'

const SERVER_URL="http://localhost:3030"

export const addTodo=(title)=>({type:"ADD_TODO",id:v4(),title})
export const toggleTodo=(id)=>({type:"TOGGLE_TODO",id})
export const fetchData=(filter)=>(dispatch,getState)=>{
	if(getIsFetching(getState(),filter)){
		return Promise.resolve()
	}
	dispatch(requestData(filter));
	return api.fetchData(filter,1000).then(response=>{
		//console.log(normalize(response,schema.arrayOfTodo));
		dispatch({type:'FETCH_TODO_SUCCESS',filter,payload:normalize(response,schema.arrayOfTodo)})},
		err=>dispatch({type:'FETCH_TODO_ERROR',message:err.message,filter}))
}
export const requestData=(filter)=>({type:'FETCH_TODO_REQUEST',filter})

export const addData=(title)=>(dispatch,getState)=>{
	return api.addData(title,1000).then(response=>{
		//console.log(normalize(response,schema.todo));
		dispatch({type:'ADD_TODO_SUCCESS',payload:normalize(response,schema.todo)})})
}
export const toggleData=(id)=>(dispatch,getState)=>{
	return api.toggleData(id,500).then(response=>{
		dispatch({type:'TOGGLE_TODO_SUCCESS',payload:normalize(response,schema.todo)})
	})
}
export const editData=(id)=>(dispatch,getState)=>{let todo=getTodo(getState(),id); todo.editing=true; dispatch({type:'EDIT_TODO',payload:normalize(todo,schema.todo)})}
export const cancelEditData=(id)=>(dispatch,getState)=>{let todo=getTodo(getState(),id); todo.editing=false; dispatch({type:'CANCEL_EDIT_TODO',payload:normalize(todo,schema.todo)})}
export const saveData=(id,title)=>(dispatch,getState)=>{
	return api.saveData(id,title,100).then(response=>{
		dispatch({type:'SAVE_TODO_SUCCESS',payload:normalize(response,schema.todo)})
	})
}

export const changeAuth=(authenticated)=>({type:CHANGE_AUTH,payload:authenticated})

export const signIn=({email,password,history})=>(dispatch)=>{
	axios.post(`${SERVER_URL}/signin`,{email,password}).then(res=>{
		console.log(res);
		localStorage.setItem("token",res.data.token)
		dispatch({type:AUTH_USER});
		history.push("/")

	}).catch(err=>{console.log("this is error");console.log(err)})
}

export const signUp = ({email,password,history})=>(dispatch)=>{
	axios.post(`${SERVER_URL}/signup`,{email,password}).then(res=>{
		console.log(res);
		localStorage.setItem("token",res.data.token)
		dispatch({type:AUTH_USER});
		history.push("/")

	})
}

export const signOut = () => (dispatch) =>{
	localStorage.removeItem("token");
	dispatch({type:UNAUTH_USER})
}