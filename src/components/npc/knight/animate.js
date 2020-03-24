import store from "../../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../config/constants";
import { Component } from "react";
import player from "../../player";

export default function animateMovement(knight) {
  console.log("hi");
  let seconds5 = 0;

  setInterval(() => {
    dispatchInterval();
  }, 500);

  function knightPosition() {
    return (knightPosition = store.getState().knight.position);
  }

  function animateKnight() {
    let oldPos = store.getState().knight.position;
    if (oldPos[0] === 720) {
      return 0;
    } else {
      return 1;
    }
  }

  function spriteLocation() {
    let direction = animateKnight();
    let { interval } = store.getState().knight;

    switch (direction) {
      case 0:
        return `-${interval * SPRITE_SIZE}px 0px`;
      case 1:
        return `-${interval * SPRITE_SIZE}px 0px`;
    }
  }

  function moveKnight() {
    let oldPos = store.getState().knight.position;
    let playerPos = store.getState().player.position;

    if (oldPos[0] === 720 && playerPos[0] !== 760) {
      oldPos[0] = 760;
      return oldPos;
    } else if (oldPos[0] === 760 && playerPos[0] !== 720) {
      oldPos[0] = 720;
      return oldPos;
    } else {
      return oldPos;
    }
  }

  function dispatchInterval() {
    if (store.getState().map.name === "Stage1"){
      if (!store.getState().knight.inCombat) {
        seconds5 += 1;
        let newPos = store.getState().knight.position;
        if (seconds5 === 4) {
          seconds5 = 0;
          newPos = moveKnight();
        }

        let newInterval = store.getState().knight.interval;
        let sprite = spriteLocation();

        if (newInterval === 0) {
          newInterval = 1;
        } else {
          newInterval = 0;
        }

        store.dispatch({
          type: "UPDATE_INTERVAL",
          payload: {
            interval: newInterval,
            position: newPos,
            spriteLocation: sprite
          }
        });
      }
    }
  }
  function walkingIndex() {
    let walkingStage = store.getState().knight.walkIndex;
    if (walkingStage === 0) {
      walkingStage = 1;
    } else if (walkingStage === 1) {
      walkingStage = 0;
    } else {
      walkingStage = 0;
    }
    return walkingStage;
  }

  //This is run every half second
  function dispatchAnimate() {
    console.log("KNIGHT UPDATE!");

    // walkingIndex = !walkingIndex;
    store.dispatch({
      type: "KNIGHT_ANIMATE",
      payload: {
        // position: knightPosition(),
        position: knightPosition(),
        walkIndex: walkingIndex()

        //run every second
        // position: newPos,
        // direction,
        // currDialogue,
        // spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  return knight;
}
