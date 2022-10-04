import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from "./store"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../src/assets/css/bootstrap.min.css"
import "../src/assets/css/stellarnav.min.css"
import "../src/assets/css/font-awesome.css"
import "../src/assets/css/owl.carousel.min.css"
import "../src/assets/css/jquery.fancybox.min.css"
import "../src/assets/css/style.css"
import "../src/assets/css/responsive.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <ToastContainer
        autoClose={1500}
        newestOnTop={true}
      />
    </Provider>
  </React.StrictMode>
); 