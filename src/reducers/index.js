import expect from 'expect'
 import {v4} from 'node-uuid'
import {combineReducers} from 'redux'
import byIds, * as fromByIds from './byIds'
import createIdList, * as fromIdsByFilter from './createIdList'
import auth, * as fromAuth from './auth'
import {reducer as reduxFormReducer} from 'redux-form'
const todo=(state,action)=>{
	//console.log(state,action)
	switch(action.type){
		case 'ADD_TODO':
		return {id:action.id,title:action.title,completed:false};
		case 'TOGGLE_TODO':
		return state.id!==action.id?Object.assign({},state):Object.assign({},state,{completed:!state.completed})
		default:
		return state
	}
	return state
}



const idsByFilter=combineReducers({
	allIds:createIdList("SHOW_ALL"),
	active:createIdList("SHOW_INCOMPLETED"),
	completed:createIdList("SHOW_COMPLETED")
})
/*
添加一个redux-form的步骤：
1 从redux-form中引入一个reducer添加到根reducer中来，注意键名为form
2 为新的form添加一个组件（可借用示例代码），使用reduxForm这个HOC对它进行配置并输出，配置时这个form拥有唯一id
3 添加一个action creator作为新form提交事件的处理器，通过connect传给form组件
4 在form组件中，为handleSubmit提供一个函数作为参数，该函数接受来自form的数据项
*/
const todos=combineReducers({byIds,idsByFilter,auth,form:reduxFormReducer})
export default todos;

export const getAuth=(state)=>(fromAuth.getAuth(state.auth))

export const getFilteredTodos=(state,filter)=>{
	let ids
	let todos
	switch(filter){
		case 'SHOW_ALL':
		ids=fromIdsByFilter.getIds(state.idsByFilter.allIds)
		break;
		case 'SHOW_COMPLETED':
		ids=fromIdsByFilter.getIds(state.idsByFilter.completed)
		break;
		case 'SHOW_INCOMPLETED':
		ids=fromIdsByFilter.getIds(state.idsByFilter.active)
		break;
		default:
		ids=fromIdsByFilter.getIds(state.idsByFilter.allIds)
	}
	todos=ids.map(x=>fromByIds.getTodo(state.byIds,x))
	return todos

}
export const getTodo=(state,id)=>fromByIds.getTodo(state.byIds,id)

export const getIsFetching=(state,filter)=>{
	
	switch(filter){
		case 'SHOW_ALL':
		return fromIdsByFilter.getIsFetching(state.idsByFilter.allIds)
		break;
		case 'SHOW_COMPLETED':
		return fromIdsByFilter.getIsFetching(state.idsByFilter.completed)
		break;
		case 'SHOW_INCOMPLETED':
		return fromIdsByFilter.getIsFetching(state.idsByFilter.active)
		break;
		default:
		return fromIdsByFilter.getIsFetching(state.idsByFilter.allIds)
	}


}
export const getErrorMessage=(state,filter)=>{
	
	switch(filter){
		case 'SHOW_ALL':
		return fromIdsByFilter.getErrorMessage(state.idsByFilter.allIds)
		break;
		case 'SHOW_COMPLETED':
		return fromIdsByFilter.getErrorMessage(state.idsByFilter.completed)
		break;
		case 'SHOW_INCOMPLETED':
		return fromIdsByFilter.getErrorMessage(state.idsByFilter.active)
		break;
		default:
		return fromIdsByFilter.getErrorMessage(state.idsByFilter.allIds)
	}


}
// const todoApp=(state={},action)=>{
// 	return {
// 		todos:todos(state.todos,action),
// 		filter:setFilter(state.filter,action)
// 	}
// }
// const byIds=(state={},action)=>{
// 	switch(action.type){
// 		case 'ADD_TODO':
// 		let newid=v4();
// 		return {...state,[newid]:{id:newid,title:action.title,completed:false}}
// 	}
// }
// const combineReducers=(reducers)=>(state={},action)=>{
// 	return Object.keys(reducers).reduce((nextstate,key)=>{
// 		nextstate[key]=reducers[key](state[key],action)
// 		return nextstate;
// 	},{})
// }

// const testAddTodo=()=>{
// 	const prestate=[]
// 	const action={type:"ADD_TODO",title:"hello world",id:0}
// 	const newstate=[{title:"hello world",completed:false,id:0}]
// 	expect(todos(prestate,action)).toEqual(newstate)
// }
// const testToggleTodo=()=>{
// 	const prestate=[{title:"hello world",completed:false,id:0},{title:"redux world",completed:false,id:1}]
// 	const action={type:"TOGGLE_TODO",id:1}
// 	const newstate=[{title:"hello world",completed:false,id:0},{title:"redux world",completed:true,id:1}]
// 	expect(todos(prestate,action)).toEqual(newstate)
// }

// testAddTodo();
// testToggleTodo();

// console.log("all passed")
