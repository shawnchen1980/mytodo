import {combineReducers} from 'redux'
const createIdList=(filter)=>{
	const ids=(state=[],action)=>{
		//if(action.filter!==filter) return state;
		switch(action.type){
			case 'ADD_TODO_SUCCESS':
			return filter!=="SHOW_COMPLETED"?[...state,action.payload.result]:state
			case 'FETCH_TODO_SUCCESS':
			return filter===action.filter?[...action.payload.result]:state
			case 'TOGGLE_TODO_SUCCESS':
			let item=action.payload.entities.todos[action.payload.result]
			if(filter==="SHOW_COMPLETED"){
				if(item.completed){
					return [...state,action.payload.result]
				} 
				else {
					return state.filter(x=>x!==item.id)
				}
			}
			else if(filter==="SHOW_INCOMPLETED"){
				if(item.completed){
					return state.filter(x=>x!==item.id)
				}
				else {
					return [...state,action.payload.result]
				}
			}
			else {
				return state;
			}
			default:
			return state
		}
	}
	const isFetching=(state=false,action)=>{
		if(action.filter!==filter) return state;
		switch(action.type){
			case 'FETCH_TODO_REQUEST':
			return true
			case 'FETCH_TODO_ERROR':
			case 'FETCH_TODO_SUCCESS':
			return false
			default:
			return state
		}
	}
	const errorMessage=(state=null,action)=>{
		if(action.filter!==filter) return state;
		switch(action.type){
			case 'FETCH_TODO_REQUEST':
			case 'FETCH_TODO_SUCCESS':
			return null
			case 'FETCH_TODO_ERROR':
			return action.message;
			default:
			return state
		}
	}
	return combineReducers({ids,isFetching,errorMessage})
}
export default createIdList
export const getIds=(state)=>(state.ids)
export const getIsFetching=(state)=>(state.isFetching)
export const getErrorMessage=(state)=>(state.errorMessage)