import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('FUnctionaluty is working excellant!', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
