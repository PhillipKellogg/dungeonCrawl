import React from "react";
import Header from "../header/index";

import "./style.scss";
import Footer from "../../website/footer/index";
export default function(props) {
  return (
    <main className="main">
      <Header />
      {props.children}
      <Footer />
    </main>
  );
}
