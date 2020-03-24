import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./footer.scss";
// import store from "../../config/store";
// import { render } from "@testing-library/react";
// import handleMovement from "./movement";
function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__title">
        <h3>Developed By: Phillip Kellogg</h3>
      </div>
      <div className="footer__content">
        <a
          href="https://github.com/PhillipKellogg"
          className="footer__contact--1 footer__element"
        >
          <div className="footer__icon footer__icon--github "></div>
          <p className="footer__text">Github</p>
        </a>
        <a
          href="https://www.linkedin.com/in/phillip-kellogg/"
          className="footer__contact--2 footer__element"
        >
          <div className="footer__icon footer__icon--linkedin "></div>
          <p className="footer__text">Linkedin</p>
        </a>
        <a
          href="mailto:kelloggphillip@gmail.com"
          className="footer__contact--3 footer__element"
        >
          <div className="footer__icon footer__icon--mail "></div>
          <p className="footer__text">eMail</p>
        </a>
      </div>
    </footer>
  );
}
export default Footer;
