import expect from 'expect'
const reducer=(state=[],action)=>{
	switch(action.type){
		case 'ADD_COUNTER':
		return [...state,0];
		case 'DEL_COUNTER':
		return [...state.slice(0,state.length-1)];
		case 'INCREMENT':
		return [...state.slice(0,action.id),state[action.id]+1,...state.slice(action.id+1)];
		case 'DECREMENT':

		return [...state.slice(0,action.id),state[action.id]-1,...state.slice(action.id+1)];
		default:
		return state;
	}
	return state;
}

//expect(reducer(0,{type:"INCREMENT"})).toEqual(1);
//expect(reducer(undefined,{})).toEqual(0);
export default reducer;