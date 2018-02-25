import React from 'react'
// import {v4} from 'node-uuid'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
const Header=(props)=>{
	console.log("Header rendering")
		let input;
		return(<div>
			<input ref={node=>{input=node}} />
			<button onClick={()=>{props.addData(input.value);input.value=""}}>
			add todo
			</button>
</div>)}
export default connect(null,actionCreators)(Header)