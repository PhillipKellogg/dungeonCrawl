import store from "../../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../config/constants";
import { Component } from "react";
import player from "../../player";

export default function animateBoss(boss) {
  console.log("hi");
  let seconds5 = 0;
 

    setInterval(() => {
      dispatchInterval();
    }, 500);

  function bossPosition() {
    return (bossPosition = store.getState().boss.position);
  }

  function animateBoss() {
    let oldPos = store.getState().boss.position;
    if (oldPos[0] === 600) {
      return 0;
    } else {
      return 1;
    }
  }

  function spriteLocation(frame) {
    let direction = animateBoss();
    // let { interval } = store.getState().boss;

    switch (direction) {
      case 0:
        return `-${frame * SPRITE_SIZE}px 0px`;
      case 1:
        return `-${frame * SPRITE_SIZE}px -40px`;
    }

  }

  function moveBoss() {
    let oldPos = store.getState().boss.position;
    let playerPos = store.getState().player.position;

    if (oldPos[0] === 560 && playerPos[0] !== 600) {
      oldPos[0] = 600;
      return oldPos;
    } else if (oldPos[0] === 600 && playerPos[0] !== 560) {
      oldPos[0] = 560;
      return oldPos;
    } else {
      return oldPos;
    }
  }

  function dispatchInterval() {
    
    if (store.getState().map.name === "Stage3"){
      console.log("HELLO");
        // let sprite;
    if (store.getState().player.fightingNow === false) {
      seconds5 += 1;
      console.log(seconds5);
      
      let  sprite=spriteLocation(seconds5);
      let newPos = store.getState().boss.position;
      if (seconds5 === 3) {
        seconds5 = 0;
        newPos = moveBoss();
      }

      let newInterval = store.getState().boss.interval;
    

      if (newInterval === 0) {
        newInterval = 1;
      } else {
        newInterval = 0;
      }

      store.dispatch({
        type: "UPDATE_INTERVAL_BOSS",
        payload: {
          interval: newInterval,
          position: newPos,
          spriteLocation: sprite
        }
      });
    }
  }}
  // function walkingIndex() {
  //   let walkingStage = store.getState().boss.walkIndex;
  //   if (walkingStage === 0) {
  //     walkingStage = 1;
  //   } else if (walkingStage === 1) {
  //     walkingStage = 0;
  //   } else {
  //     walkingStage = 0;
  //   }
  //   return walkingStage;
  // }



  function dispatchDrawBoss(draw){
    store.dispatch({
      type:"DRAW_BOSS",
      payload:{
        display: draw
      }
    })
  }

  //This is run every half second
  function dispatchAnimate() {
    // console.log("BOSS UPDATE!");

    // walkingIndex = !walkingIndex;
    store.dispatch({
      type: "BOSS_ANIMATE",
      payload: {
        // position: bossPosition(),
        position: bossPosition(),
        // walkIndex: walkingIndex()

        //run every second
        // position: newPos,
        // direction,
        // currDialogue,
        // spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  return boss;
}
