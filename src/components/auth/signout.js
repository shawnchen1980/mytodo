import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../actions/actionCreators'
class Signout extends Component {
	componentDidMount(){
		console.log("signOut didmount")
		
	}
	componentWillMount(){
		console.log("signOut willmount")
		//this.props.signOut();
		//setTimeout(()=>{this.props.signOut()},0);
		this.props.signOut();
	}
	render() {
		console.log("signOut rendering")
		return <Redirect to="/" />

	}
}

export default connect(null,actions)(Signout)

