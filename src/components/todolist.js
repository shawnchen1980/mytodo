import React,{Component} from 'react'

import {Provider,connect} from 'react-redux'


import {BrowserRouter,Route,Link,Switch,Redirect,withRouter} from 'react-router-dom'
import {AUTH_USER} from '../actions/type'
import * as api from '../utility/localStorage'
import * as actionCreators from '../actions/actionCreators'
import store from '../utility/configStore'
import Header from './header'
import Footer from './footer'
import List from './list'
import NavHeader from './navHeader'
import require_auth from './require_auth'
import SigninForm from './auth/signinForm'
import SignupForm from './auth/signupForm'
import Signout from './auth/signout'
//const InitialState={todos:[{id:999,title:"first todo"},{id:998,title:"second todo",}],filter:"SHOW_ALL"}






//store.subscribe(()=>{saveState(store.getState())})


class TodoList extends Component {
	constructor(){
		super();
		

	}
	componentDidMount(){
		//api.fetchData(this.props.dispatch,1000)
		this.props.fetchData(this.props.match.params.filter)
	}
	componentDidUpdate(prevProps){
		console.log("componentDidUpdate!!!")
		this.props.fetchData(this.props.match.params.filter)
	}
	render(){
		console.log("TodoList render():",this.props.match)
		return <div>
		
		<br/>
			{/*<input ref={node=>{this.input=node}} />
			<button onClick={()=>{this.props.dispatch({type:"ADD_TODO",id:v4(),title:this.input.value})}}>
			add todo
			</button>*/}
			<Header />

			{/*<ul>
						{this.props.todos.map((todo)=>{
							return <li key={todo.id} style={{textDecoration:todo.completed?'line-through':'none'}} onClick={()=>{this.props.dispatch({type:"TOGGLE_TODO",id:todo.id})}}>{todo.title}</li>
						})}
			
						</ul>*/}
			<List />
			<Footer />
			{/*<FilterLink filter="SHOW_ALL" active={match.params.filter=="SHOW_ALL"} >
						All
						</FilterLink>
						{' '}
						<FilterLink filter="SHOW_COMPLETED" active={match.params.filter=="SHOW_COMPLETED"}>
						Completed
						</FilterLink>
						{' '}
						<FilterLink filter="SHOW_INCOMPLETED" active={match.params.filter=="SHOW_INCOMPLETED"}>
						Incompleted
						</FilterLink>*/}

		</div>
	}
}



const MyTodoList=connect(null,actionCreators)(TodoList)
const token=localStorage.getItem("token")
if(token){
	store.dispatch({type:AUTH_USER})
}

const MyApp=()=>(
	<Provider store={store}>
		{/*<SignupForm />*/}
		<BrowserRouter>
				<div>
		
					<Route path="/" component={NavHeader} />
					<Switch>
					<Redirect exact from="/" to="/SHOW_ALL" />
					<Route path="/signin" component={SigninForm} />
					<Route path="/signup" component={SignupForm} />
					<Route path="/signout" component={Signout} />
					<Route path="/:filter?" component={require_auth(MyTodoList)} />
					
					</Switch>
				</div>
				</BrowserRouter>
	</Provider>
	)
export default MyApp