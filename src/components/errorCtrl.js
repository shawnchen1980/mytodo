import React from 'react'
import {connect} from 'react-redux'
import {getErrorMessage} from '../reducers'
import {withRouter} from 'react-router-dom'
const ErrMessage=({message,onRetry})=><div>{message}<button onClick={onRetry}>retry</button></div>
const mapStateToProps=(state,ownProps)=>({
	message:getErrorMessage(state,ownProps.match.params.filter)
})
export default withRouter(connect(mapStateToProps)(ErrMessage))