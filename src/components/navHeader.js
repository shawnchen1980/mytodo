import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {getAuth} from '../reducers'
import * as actions from '../actions/actionCreators'
const NavHeader=(props)=>(
	<ul>
		<li><Link to="/">Todo List</Link></li>
		<li><Link to="/signin">Sign In</Link></li>
		<li><Link to="/signup">Sign Up</Link></li>
		<li><Link to="/signout">Sign Out</Link></li>
		<li><button onClick={()=>{console.log("props.auth is ",props.auth);props.changeAuth(!props.auth)}}>{props.auth?"log out":"log in"}</button></li>
	</ul>

	);
const mapStateToProps=(state)=>({
	auth:getAuth(state)
})
export default connect(mapStateToProps,actions)(NavHeader);