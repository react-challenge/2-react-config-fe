// import logo from './logo.svg';
import './App.scss';
import MenuLeft from './components/MenuLeft';
import { Outlet, useHref } from "react-router-dom";
import { message } from 'antd'
import axiosApi from "./utils/axios";
import { useEffect } from 'react';

function App() {
  const accountInfo = {}

  const curHref = useHref()
  const isShowMenu = () => {
    const hideMenuList = ['/login']
    if (hideMenuList.includes(curHref)) {
      return false
    }
    return true
  }

  // 获取用户信息
  async function getUserInfo() {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // sleep, test loading
      const res = await axiosApi.get("/user/info");
      console.log("获取用户信息", res);
      Object.assign(accountInfo, res.data);
    } catch (e) {
      console.error(e);
      message.error(e.message);
    }
  };

  useEffect(() => {
    if (curHref === '/login') {
      return
    }
    console.log('get user info')
    getUserInfo()
  })

  return (
    <div>
      <header className="home-header">
        <h1><a href="/">zuo-config 配置中心</a></h1>
        <div>
          {accountInfo.name}
          <a href="https://github.com/react-challenge/2-react-config-fe" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </header>
      <main className="home-main">
        {isShowMenu() &&
          (<nav className="home-main-left">
            <MenuLeft />
          </nav>)
        }
        <section
          className={'home-main-right ' +  (isShowMenu() ? '' : 'hide-left-menu') }
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;
