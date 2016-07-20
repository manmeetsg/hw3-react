import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import './style.scss';

// entry point that just renders app
// could be used for routing at some point
// Create note method that makes notes on the fly and adds them to your map
// Note component tells you to render the note, and <Note className='note'>
ReactDOM.render(<App />, document.getElementById('main'));
