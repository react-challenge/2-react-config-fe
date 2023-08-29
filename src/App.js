// import logo from './logo.svg';
import './App.scss';
import MenuLeft from './components/MenuLeft';

function App() {

  const accountInfo = {}
  return (
    <div>
      <header class="home-header">
        <h1>zuo-config 配置中心</h1>
        <div>
          {accountInfo.name}
          <a href="https://github.com/react-challenge/2-react-config-fe" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </header>
      <main class="home-main">
        <nav class="home-main-left" v-if="!route.meta.hideLeftMenu">
          <MenuLeft />
        </nav>
        <section
          className="home-main-right { route.meta.hideLeftMenu ? 'hide-left-menu' : '' }"
        >
          {/* <RouterView /> */}
        </section>
      </main>
    </div>
  );
}

export default App;
