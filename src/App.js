import React from 'react';


// components
import Nav from './components/Nav/Nav';

import './App.css'

import routes from './routes';

const App = () => (
  <>
    <Nav />
    { routes }
  </>
);

export default App;