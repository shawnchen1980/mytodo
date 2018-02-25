import {CHANGE_AUTH} from '../actions/type'
const byIds=(state={},action)=>{
	// console.log(state,action)
	// //return state
	switch(action.type){
		// case 'ADD_TODO':
		// case 'TOGGLE_TODO':
		// return {...state,[action.id]:todo(state[action.id],action)}
		 
		// return state.map((todoitem)=>{
		// //	return todo;
		// 	return todo(todoitem,action);
		//  })
		case CHANGE_AUTH:
		
		return state;
		default:

		
	}
	// console.log(action)
	if(action.payload && action.payload.entities ){
		return {...state,...action.payload.entities.todos};
	}
	return state
}
export default byIds;
export const getTodo=(state,id)=>state[id]