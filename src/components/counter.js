import React from 'react'
import {createStore} from 'redux'
import {connect,Provider} from 'react-redux'
import reducer from '../reducers/counterReducer'
const App=({arr,dispatch})=><div>{arr.map((value,i)=><div key={i}><h3>{value}</h3>
	<button onClick={()=>{dispatch({type:"INCREMENT",id:i})}}>+</button>
	<button onClick={()=>{dispatch({type:"DECREMENT",id:i})}}>-</button></div>)}
<button onClick={()=>{dispatch({type:"ADD_COUNTER"})}}>ADD COUNTER</button>
<button onClick={()=>{dispatch({type:"DEL_COUNTER"})}}>DEL COUNTER</button>
</div>
const mapStateToProps=(state)=>({arr:state});
const Counter=connect(mapStateToProps)(App)
const store=createStore(reducer);
const MyApp=()=>(
	<Provider store={store}>
		<Counter />
	</Provider>
	)
export default MyApp;