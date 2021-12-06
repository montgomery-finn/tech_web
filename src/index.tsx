import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRoqkq5GQNxiCm6Q_CfZFj3oCZ0223d8A",
  authDomain: "restaurante-tech-983df.firebaseapp.com",
  databaseURL: "https://restaurante-tech-983df-default-rtdb.firebaseio.com",
  projectId: "restaurante-tech-983df",
  storageBucket: "restaurante-tech-983df.appspot.com",
  messagingSenderId: "1057330796206",
  appId: "1:1057330796206:web:b8da455be1bc0f6347bf3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
