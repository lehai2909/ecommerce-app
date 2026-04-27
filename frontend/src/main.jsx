import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify';
import './index.css'
import App from './App.jsx'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-west-1_M6NrbiSYy',
      userPoolClientId: '4t2jjoo7k6mb8fnk5bn8ji6fa2',
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
