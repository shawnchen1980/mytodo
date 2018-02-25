import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getAuth} from '../reducers'
const require_auth=(ComposedComponent)=>{
	class Authentication extends Component {
		render() {
			return this.props.auth?<ComposedComponent {...this.props} />:(<div>not log in yet?</div>)
		}
	}
	const mapStateToProps=(state)=>({auth:getAuth(state)})
	return connect(mapStateToProps)(Authentication)
}

export default require_auth