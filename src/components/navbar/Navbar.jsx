import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ConnectButton } from "klaykit";
import { useAccount } from "wagmi";

const Menu = () => {
  let { address, isConnected } = useAccount();
  return (
    <>
      <a href="https://docs.aidream.network" target="_blank">
        <p>Docs</p>
      </a>
      {isConnected ? (
        <>
          <Link to={`/creator/${address}`}>
            <p>My profile</p>
          </Link>
          <Link to="/prompt">
            <button>
              <p>Create new art</p>
            </button>
          </Link>
        </>
      ) : null}
    </>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);
  let { address, isConnected } = useAccount();
  const handleLogout = () => {
    setUser(false);
  };
  const handleLogin = () => {
    setUser(true);
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>AI DREAM NETWORK</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder="Search Item Here" autoFocus={true} />
          <Menu />
        </div>
      </div>
      <div className="navbar-sign">
        <ConnectButton />
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user ? (
                <>
                  <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link>
                  <button type="button" className="secondary-btn">
                    Connect
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button type="button" className="secondary-btn">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
