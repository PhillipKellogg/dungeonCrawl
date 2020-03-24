import React from "react";
// import { render } from "@testing-library/react";
import { connect } from "react-redux";

import animateBoss from "./animate";
import store from "../../../config/store";
function Boss(props) {
  // if (store.getState().player.)
  return (
    <div
      style={{
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        backgroundPosition: props.spriteLocation,
        backgroundImage: `url(${props.stillFrame})`,
        backgroundSize: props.bgSize,
        backgroundRepeat: "no-repeat",
        width: props.width,
        height: props.height,
        display: props.display,
        visibility: props.visibility
      }}
    ></div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.boss
  };
}

export default connect(mapStateToProps)(animateBoss(Boss));
