import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ApiMock from './views/ApiMock';
import Login from './views/Login';
import ShortLink from './views/ShortLink';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
          path: "/short-link",        
          element: <ShortLink />
        },
        {
          path: "/api-mock",
          element: <ApiMock />
        },
        {
          path: "/login",
          element: <Login />,
          meta: { requiresAuth: false, hideLeftMenu: true },
        },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
