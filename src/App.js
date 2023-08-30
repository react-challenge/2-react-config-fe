// import logo from './logo.svg';
import './App.scss';
import MenuLeft from './components/MenuLeft';
import { Outlet } from "react-router-dom";

function App() {

  const accountInfo = {}
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
        <nav className="home-main-left" v-if="!route.meta.hideLeftMenu">
          <MenuLeft />
        </nav>
        <section
          className="home-main-right { route.meta.hideLeftMenu ? 'hide-left-menu' : '' }"
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;
