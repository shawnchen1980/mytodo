import React from 'react'
import {Link,withRouter} from 'react-router-dom'
const FilterLink=({filter,active,children})=>(
	!active?
	<Link to={`/${filter}`}>
	{children}
	</Link>
	:
	<span>
	{children}
	</span>
	)
const Footer=({match})=>(<div>
			<FilterLink filter="SHOW_ALL" active={match.params.filter=="SHOW_ALL"} >
			All
			</FilterLink>
			{' '}
			<FilterLink filter="SHOW_COMPLETED" active={match.params.filter=="SHOW_COMPLETED"}>
			Completed
			</FilterLink>
			{' '}
			<FilterLink filter="SHOW_INCOMPLETED" active={match.params.filter=="SHOW_INCOMPLETED"}>
			Incompleted
			</FilterLink>
			</div>)
export default withRouter(Footer)