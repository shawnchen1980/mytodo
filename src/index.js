import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MyApp from './components/todolist'
//import SingleForm from './components/simpleForm'
ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();
