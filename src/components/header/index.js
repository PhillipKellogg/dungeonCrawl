import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
// import store from "../../config/store";
// import { render } from "@testing-library/react";
// import handleMovement from "./movement";
function Header(props) {
  return (
    <nav className="header">
      <div className="header__text_wrapper">
        <Link to="/" className="header__logo">
          DUNGEON CRAWL
        </Link>
        <ul className="link">
          <Link to="/" className="link__text link__element link__element--1 ">
            The Game
          </Link>
          <Link
            to="/about"
            className="link__text link__element link__element--2 "
          >
            About Dungeon Crawl
          </Link>
          <Link
            to="/phillipkellogg"
            className="link__text link__element link__element--3 "
          >
            About Myself
          </Link>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
