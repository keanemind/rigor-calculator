import 'file-loader?name=index.html!./index.html';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const appRoot = document.getElementById('app');

ReactDOM.render(<App />, appRoot);
