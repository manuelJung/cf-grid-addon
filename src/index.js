import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.contentfulExtension.init(cf => {
    ReactDOM.render(<App cf={cf}/>, document.getElementById('root'));
})
