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
import { store } from './store/index'
import { Provider } from 'react-redux'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

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
        handler: {
          requiresAuth: false, hideLeftMenu: true
        },
        // meta: { requiresAuth: false, hideLeftMenu: true },
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
