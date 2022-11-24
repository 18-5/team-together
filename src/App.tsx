import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom'
import Logo from './assets/logo.svg'
import './App.scss'

function App() {
  return (
    <div className="container h-100">
      <div className='row h-100'>
        <nav className="col-4 d-flex flex-column justify-content-between py-3">
          <div className="nav nav-pills flex-column">
            <Link to={`/`} className="nav-link fs-5 pb-4">
              <img src={Logo} alt="Team Together" />
            </Link>
            <NavLink to={`/`} className="nav-link fs-5">홈</NavLink>
            <NavLink to={`explore`} className="nav-link fs-5">둘러보기</NavLink>
            <NavLink to={`search`} className="nav-link fs-5">검색</NavLink>
            <NavLink to={`projects`} className="nav-link fs-5">내 프로젝트</NavLink>
            <NavLink to={`messages`} className="nav-link fs-5">쪽지</NavLink>
            <NavLink to={`notifications`} className="nav-link fs-5">알림</NavLink>
            <NavLink to={`connection-test`} className="nav-link fs-5">Connection Test</NavLink>
          </div>
          <div className="nav flex-column">
            <Link to={`profile`} className="nav-link">프로필</Link>
          </div>
        </nav>
        <div className="col-8 h-100 overflow-scroll">
          <div className="py-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div >
  );
}

export default App
