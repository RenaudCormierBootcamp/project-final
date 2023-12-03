import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './components/App'; 
import { AppProvider } from './components/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <AppProvider>
      <App /> 
    </AppProvider> 
);
 