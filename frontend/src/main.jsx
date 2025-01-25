import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import {Provider} from 'react-redux';
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'
import { EmailProvider } from './context/EmailContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <EmailProvider>
        <App />
        <Toaster />
      </EmailProvider>
      </PersistGate>
    </Provider> 
  </StrictMode>,
)

//Toaster is added in the main.jsx since it manages the notifications globally