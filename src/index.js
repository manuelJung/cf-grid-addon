import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

if(process.env.NODE_ENV !== 'production'){
    const cf = {
        window: {
            startAutoResizer: () => null
        }
    }
    ReactDOM.render(<App cf={cf}/>, document.getElementById('root'));
}

if(process.env.NODE_ENV === 'production'){
    window.contentfulExtension.init(cf => {
        ReactDOM.render(<App cf={cf}/>, document.getElementById('root'));
    })
}
