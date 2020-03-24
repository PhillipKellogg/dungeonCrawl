import React from "react";
import heart from "../../assets/tiles/heart pixel art 254x254.png";
import "./style.scss";
import store from "../../config/store";
function Dialogue(props) {
  function drawHP() {
    let healthArr = [];
    if (props.health !== null) {
      for (let i = 0; i < props.health; i++) {
        healthArr.push(<img src={heart} alt="Heart" height="19" width="19" />);
      }
      return healthArr;
    }
  }

  function drawEnemyHP() {
    let enemyHP = [];
    if (props.enemyHealth !== null) {
      for (let i = 0; i < props.enemyHealth; i++) {
        enemyHP.push(<img src={heart} alt="Heart" height="19" width="19" />);
      }
      return enemyHP;
    }
  }
  function eHPTitle() {
    if (props.enemyHealth !== null) {
      return <p className="sub__title">Enemy Hp</p>;
    }
  }

  function msg() {
    if (props.msg !== null) {
      return props.msg[props.page];
    }
  }

  return (
    <div className="box__wrapper">
      <div className="health__wrapper">
        <p className="sub__title">Player HP</p>
        {drawHP()}
      </div>
      <div className="box">
        <div className="box__border">
          <div className="box__border--text">
            {!!props.msg ? (
              <div className="box__container">
                {msg()}
                <div className="box__continue">
                  <p>J continue</p>
                  <p>K back</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="health__wrapper">
        {eHPTitle()}
        {drawEnemyHP()}
      </div>
    </div>
  );
}

export default Dialogue;
