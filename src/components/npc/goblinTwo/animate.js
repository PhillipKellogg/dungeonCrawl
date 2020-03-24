import store from "../../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../config/constants";
import { Component } from "react";
import player from "../../player";

export default function animateGoblin(goblinTwo) {
  // console.log("hi");
  let seconds5 = 0;
 
  // while (store.getState().map.name === "Stage2"){
    setInterval(() => {
      dispatchInterval();
    }, 1500);

  function goblinPosition() {
    return (goblinPosition = store.getState().goblinTwo.position);
  }

  function animateGoblin() {
    let oldPos = store.getState().goblinTwo.position;
    if (oldPos[0] === 720) {
      return 0;
    } else {
      return 1;
    }
  }

  function spriteLocation(frame) {
    let direction = animateGoblin();
    // let { interval } = store.getState().goblin;

    switch (direction) {
      case 0:
        return `-${frame * SPRITE_SIZE}px 0px`;
      case 1:
        return `-${frame * SPRITE_SIZE}px -40px`;
    }
      if (store.getState().map.name === "Stage2"){
    console.log("hi");
      }
  }

  function moveGoblin() {
    let oldPos = store.getState().goblinTwo.position;
    let playerPos = store.getState().player.position;

    if (oldPos[1]=== 320 && playerPos[1]!== 360) {
      oldPos[1]= 360;
      return oldPos;
    } else if (oldPos[1]=== 360 && playerPos[1]!== 320) {
      oldPos[1]= 320;
      return oldPos;
    } else {
      return oldPos;
    }
  }

  function dispatchInterval() {
    if (store.getState().goblinTwo.display !== "none"){
 
    if (store.getState().map.name === "Stage2"){
      console.log("HELLO");
        // let sprite;
    if (store.getState().player.fightingNow === false) {
      seconds5 += 1;
      console.log(seconds5);
      
      let  sprite=spriteLocation(seconds5);
      let newPos = store.getState().goblinTwo.position;
      if (seconds5 === 3) {
        seconds5 = 0;
        newPos = moveGoblin();
      }

      let newInterval = store.getState().goblinTwo.interval;
    

      if (newInterval === 0) {
        newInterval = 1;
      } else {
        newInterval = 0;
      }

      store.dispatch({
        type: "UPDATE_INTERVAL_GOBLIN_TWO",
        payload: {
          interval: newInterval,
          position: newPos,
          spriteLocation: sprite
        }
      });
    }
  }}   }
  // function walkingIndex() {
  //   let walkingStage = store.getState().goblin.walkIndex;
  //   if (walkingStage === 0) {
  //     walkingStage = 1;
  //   } else if (walkingStage === 1) {
  //     walkingStage = 0;
  //   } else {
  //     walkingStage = 0;
  //   }
  //   return walkingStage;
  // }



  function dispatchDrawGoblin(draw){
    store.dispatch({
      type:"DRAW_GOBLIN_TWO",
      payload:{
        display: draw
      }
    })
  }

  //This is run every half second
  function dispatchAnimate() {
    // console.log("GOBLIN UPDATE!");

    // walkingIndex = !walkingIndex;
    store.dispatch({
      type: "GOBLIN_ANIMATE_TWO",
      payload: {
        // position: goblinPosition(),
        position: goblinPosition(),
        // walkIndex: walkingIndex()

        //run every second
        // position: newPos,
        // direction,
        // currDialogue,
        // spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  return goblinTwo;
}
