import {v4} from 'node-uuid'
export const loadState=()=>{
	try{
		const persistedState=localStorage.getItem("state")
		if(persistedState!=null){
			return JSON.parse(persistedState);
		}
		return undefined
	}
	catch(err){
		return undefined
	}
}
export const saveState=(state)=>{
	try{
		const persistedState=JSON.stringify(state)
		localStorage.setItem("state",persistedState)
		console.log("logged:",persistedState)
	}
	catch(err){
		console.log(err)
	}
}
const delay=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
const InitialState={todos:[{id:999,title:"first todo",completed:true,editing:false},{id:998,title:"second todo",completed:false,editing:false}],filter:"SHOW_ALL"}
const getData=(filter,data)=>{
	switch(filter){
		case "SHOW_ALL":
		return data
		case "SHOW_COMPLETED":
		return data.filter(x=>x.completed)
		case "SHOW_INCOMPLETED":
		return data.filter(x=>!x.completed)
		default:
		return data
	}
}
export const fetchData=(filter,ms)=>delay(ms).then(()=>{/*if(Math.random()>0.5) {throw new Error("haha");}return [];*/ return getData(filter,InitialState.todos)})
export const addData=(title,ms)=>delay(ms).then(()=>{let item={id:v4(),title,completed:false,editing:false};InitialState.todos.push(item);return item})
export const toggleData=(id,ms)=>delay(ms).then(()=>{let item=InitialState.todos.find(x=>x.id===id);item.completed=!item.completed;return item;})
export const saveData=(id,title,ms)=>delay(ms).then(()=>{let item=InitialState.todos.find(x=>x.id===id);item.title=title;return item;})