import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actionCreators from '../actions/actionCreators'
import {getFilteredTodos,getIsFetching,getErrorMessage}  from '../reducers'
import ErrMessage from './errorCtrl'
const List=(props)=>{
	if(props.errorMessage!==null){
		return <ErrMessage onRetry={()=>props.fetchData(props.match.params.filter)} />
	} 
	console.log("the list is showing")
	return props.isFetching && !props.todos.length?
	(<div>Loading...</div>):
	(<ul>
			{props.todos.map((todo)=>{
				let input;
				return !todo.editing?<li key={todo.id} 
						   style={{textDecoration:todo.completed?'line-through':'none'}} 
						   onClick={()=>{props.toggleData(todo.id)}}>
						   {todo.title} <button onClick={(e)=>{e.stopPropagation(); props.editData(todo.id)}}>Edit</button>
						</li>:
						<li key={todo.id}><input ref={node=>input=node} defaultValue={todo.title} />
						<button onClick={()=>{props.saveData(todo.id,input.value)}}>Save</button>
						<button onClick={()=>props.cancelEditData(todo.id)}>Cancel</button></li>
			})}

	</ul>)
}
const mapStateToProps=(state,ownProps)=>({
	todos:getFilteredTodos(state,ownProps.match.params.filter),
	isFetching:getIsFetching(state,ownProps.match.params.filter),
	errorMessage:getErrorMessage(state,ownProps.match.params.filter)
})
export default withRouter(connect(mapStateToProps,actionCreators)(List));