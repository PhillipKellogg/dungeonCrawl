import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import { func } from "prop-types";
import { tiles } from "../../data/maps/1";
import { fightStageWorld } from "../../data/maps/2";
import { worldTwoTiles } from "../../data/maps/3";
import { worldThreeTiles } from "../../data/maps/4";
import dispatchStage2Sign from "../npc/sign/signRenderer"
import drawBoss from "../npc/boss/drawBoss"
import fight from "./fight";
import { someSeries } from "async";

export default function handleMovement(player) {
  function observeBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];

    if (nextTile===9){
      if (store.getState().map.name === "Stage1"){
      setTimeout(function(){worldTransition(worldTwoTiles, "Stage2")}, 1500);
      // console.log("STAGE CHANGE IF STATEMENT");
      setTimeout(function(){dispatchPosition(40,120)}, 1500);
      setTimeout(function(){signDisplayNoneBadFunctionChangeThis()}, 1500);
      setTimeout(function(){dispatchDrawGoblin("flex")}, 1500);
      setTimeout(function(){dispatchDrawGoblinTwo("flex")}, 1500);
      setTimeout(function(){dispatchStage2Sign()}, 1500);

      }
      if (store.getState().map.name === "Stage2"){
        setTimeout(function(){worldTransition(worldThreeTiles, "Stage3")}, 1500);
        // console.log("STAGE CHANGE IF STATEMENT");
        setTimeout(function(){dispatchPosition(80,240)}, 1500);
        setTimeout(function(){dispatchDrawGoblin("none")}, 1500);
        setTimeout(function(){dispatchDrawGoblinTwo("none")}, 1500);
        setTimeout(function(){drawBoss()}, 1500);
        setTimeout(function(){dispatchStage2Sign()}, 1500);

        }
    }

    return nextTile < 20;
  }
  function dispatchDrawGoblin(draw){
    store.dispatch({
      type:"DRAW_GOBLIN",
      payload:{
        display: draw
      }
    })
  }
  function dispatchDrawGoblinTwo(draw){
    store.dispatch({
      type:"DRAW_GOBLIN_TWO",
      payload:{
        display: draw
      }
    })
  }
  function dispatchPosition(x,y){
    const initialPos = [x,y];
    store.dispatch({
      type: "POSITION_CHANGE",
      payload: {
        position: initialPos,
      }
    });
  }

  function getNewPosition(oldPos, direction) {
    switch (direction) {
      default:
        // console.log(direction);

      case "left":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "right":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "up":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "down":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case `down`:
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case `right`:
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case `left`:
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case `up`:
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 7 ? 0 : walkIndex + 1;
  }

  function dispatchMove(direction, newPos, currDialogue, talkingTo) {
    const walkIndex = getWalkIndex();

    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        currDialogue,
        page: 0,
        talkingTo,
        finalPage: false,
        spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  function startDialogue(interact) {
    switch (interact) {
      //????????????????????????? INTERACT KEYS ?????????????????????????????
      case "i":
        // fight("Attack")
        return null; // Option One
      case "accept":
        return changePage(1); // J
      case "decline":
        return changePage(-1); // K
      case "l":
        // fight("Heal")
        return null; // Option two
    }
  }

  function valueBoundary(value) {
    let { currDialogue, canFight, inCombat } = store.getState().player;
    let newVal = store.getState().player.page + value;

    if (
      !!currDialogue &&
      newVal === store.getState().player.currDialogue.length - 1
    ) {
      return "FINAL_PAGE";
    } else if (
      !!currDialogue &&
      newVal < store.getState().player.currDialogue.length &&
      newVal >= 0
    ) {
      return true;
    }
    return false;
  }

  function changePage(value) {
    let index;
    index = valueBoundary(value);

    if (index === "FINAL_PAGE") {
      store.dispatch({
        type: "CHANGE_PAGE",
        payload: { value, finalPage: true }
      });
    } else if (index) {
      store.dispatch({
        type: "CHANGE_PAGE",
        payload: { value, finalPage: false }
      });
    }
  }

  function hasDialogue(npc) {
    if (npc.dialogue !== null || npc.dialogue !== undefined) {
      return npc.dialogue;
    }
  }

  function dispatchCombat(npc) {
    // console.log("GET READY TO FIGHT!");

    store.dispatch({
      type: "COMBAT",
      payload: {
        inCombat: true,
        fighter: npc.name
      }
    });
  }

  function hasCombatCheck(npc) {
    if (npc.hasCombat) {
      return true;
    }
  }

  function inCombat(npc) {
    if (npc.hasCombat) {
      if (hasCombatCheck(npc) && hasDialogue(npc) !== null) {
        // console.log(`${npc.name} has combat is equal to ${npc.hasCombat}`);
        // setTimeout(console.log("GET READY FOR FIGHT IN 3 SECONDS")(npc), 2000);
        dispatchCombat(npc);
      }
    }
  }

  function npcCheck(direction, oldPos, newPos) {
    //NPC List
    const sign = store.getState().sign;
    const signPos = sign.position;
    const knight = store.getState().knight;
    const knightPos = knight.position;
    const goblin = store.getState().goblin;
    const goblinPos = goblin.position;
    const goblinTwo = store.getState().goblinTwo;
    const goblinTwoPos = goblinTwo.position;
    const boss = store.getState().boss;
    const bossPos = boss.position;
    let move = true;
    //repeat for each NPC
    if (newPos[1] === signPos[1] && newPos[0] === signPos[0]) {
      dispatchMove(direction, oldPos, hasDialogue(sign), sign.name);
      move = false; //Is it ok to move?
    }else if (newPos[1] === knightPos[1] && newPos[0] === knightPos[0]) {
      dispatchMove(direction, oldPos, hasDialogue(knight), knight.name);
      inCombat(knight);
      move = false;
    } else if (newPos[1] === goblinPos[1] && newPos[0] === goblinPos[0] && store.getState().map.name === "Stage2") {
      dispatchMove(direction, oldPos, hasDialogue(goblin), goblin.name);
      inCombat(goblin);
      move = false;
    } else if (newPos[1] === goblinTwoPos[1] && newPos[0] === goblinTwoPos[0]  && store.getState().map.name === "Stage2") {
      dispatchMove(direction, oldPos, hasDialogue(goblinTwo), goblinTwo.name);
      inCombat(goblinTwo);
      move = false;
    } else if (newPos[1] === bossPos[1] && newPos[0] === bossPos[0]  && store.getState().map.name === "Stage3") {
      dispatchMove(direction, oldPos, hasDialogue(boss), boss.name);
      inCombat(boss);
      move = false;
    }
    return move;
  }

  function attemptMove(direction) {
    //Old Pos is old position before moving the player
    const oldPos = store.getState().player.position;
    //newPos is the calculated new position
    const newPos = getNewPosition(oldPos, direction);
    let check = 0;
    if (
      observeBoundaries(oldPos, newPos) &&
      npcCheck(direction, oldPos, newPos) &&
      observeImpassable(oldPos, newPos)
    )
      dispatchMove(direction, newPos);
  }

  function checkFightStatus(interact) {
    switch (interact) {
      case "accept":
        if (
          store.getState().player.inCombat &&
          store.getState().player.finalPage &&
          !store.getState().player.fightingNow
        ) {
          //+++++++++++++++++++++++++++++++++MAP UPDATES++++++++++++++++++++++++++++++++++++++++
          
          
          //-------------------------------------------------------------CHANGE THIS---- TESTING ONLY ---------------------------------------------------------------------------------------------------------------------------
          //-------------------------------------------------------------CHANGE THIS---- TESTING ONLY ---------------------------------------------------------------------------------------------------------------------------
          
          if (store.getState().player.talkingTo === "knight") {
            setTimeout(function(){dispatchPrevMap(tiles,"Stage1")}, 1500);
            setTimeout(signDisplayNoneBadFunctionChangeThis, 1500);
            setTimeout(function(){worldTransition(fightStageWorld, "fightStage1")}, 1500);
            setTimeout(fightingKnightNow, 1500);
            setTimeout(fightTheKnight, 1500);
            //declare fighting
          }
          if (store.getState().player.talkingTo === "goblin") {
            setTimeout(function(){dispatchPrevMap(worldTwoTiles,"Stage2")}, 1500);
            setTimeout(signDisplayNoneBadFunctionChangeThis, 1500); //Made another one of these bad functions for GOBLINTWO
            setTimeout(function(){worldTransition(fightStageWorld, "fightStage1")}, 1500);
            setTimeout(fightingGoblinNow, 1500);
            setTimeout(fightFirstGoblin, 1500);
          }
          if (store.getState().player.talkingTo === "goblinTwo") {
            setTimeout(function(){goblinOneVisibility("hidden")}, 1500);
            setTimeout(function(){dispatchPrevMap(worldTwoTiles,"Stage2")}, 1500);
            setTimeout(signDisplayNoneBadFunctionChangeThis, 1500); //Made another one of these bad functions for GOBLINTWO
            setTimeout(function(){worldTransition(fightStageWorld, "fightStage1")}, 1500);
            setTimeout(fightingGoblinTwoNow, 1500);
            setTimeout(fightSecondGoblin, 1500);
          }
          if (store.getState().player.talkingTo === "boss") {
            setTimeout(function(){goblinOneVisibility("hidden")}, 1500);
            setTimeout(function(){dispatchPrevMap(worldThreeTiles,"Stage3")}, 1500);
            setTimeout(signDisplayNoneBadFunctionChangeThis, 1500); //Made another one of these bad functions for GOBLINTWO
            setTimeout(function(){worldTransition(fightStageWorld, "fightStage1")}, 1500);
            setTimeout(fightingBossNow, 1500);
            setTimeout(fightBoss, 1500);
          }
          // return console.log("changing stage");
        }
    }
  }

  function endKnightFight() {
    if (
      store.getState().player.talkingTo === "knightBattle" &&
      store.getState().player.fightNow === false
    ) {
    }
  }
  function goblinOneVisibility(visibility) {
    store.dispatch({
      type: "GOBLIN_VISIBILITY",
      payload: {
        visibility
      }
    });
  }

function dispatchPrevMap(tiles, name) {

  store.dispatch({
    type: "PREV_MAP",
    payload: {
      prevMap: tiles,
      prevMapName: name
    }
  });
}

  function worldTransition(world, name) {
    // console.log("CHANGING MAP!");

    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: world,
        name
      }
    });
  }


  function fightTheKnight() {
    const fightStance = [240, 0];
    store.dispatch({
      type: "DRAW_FIGHT",
      payload: {
        pos: fightStance,
        sLocation: "0px 0px",
        fighting: true
      }
    });
  }

  function fightFirstGoblin() {
    const fightStance = [240, 0];
    store.dispatch({
      type: "DRAW_FIGHT_G1",
      payload: {
        pos: fightStance,
        sLocation: "0px 0px",
        fighting: true
      }
    });
  }

  function fightSecondGoblin() {
    const fightStance = [240, 0];
    store.dispatch({
      type: "DRAW_FIGHT_G2",
      payload: {
        pos: fightStance,
        sLocation: "0px 0px",
        fighting: true
      }
    });
  }
  function fightBoss() {
    const fightStance = [240, 0];
    store.dispatch({
      type: "DRAW_FIGHT_BOSS",
      payload: {
        pos: fightStance,
        sLocation: "0px 0px",
        fighting: true
      }
    });
  }
  function fightingKnightNow() {
    const fightDialogue = [
      "GET READY FOR BATTLE",
      " I to Attack \xa0\xa0\xa0\xa0 L to Heal"
    ];
    store.dispatch({
      type: "FIGHTING_NOW",
      payload: {
        fightingNow: true,
        visibility: "hidden",
        talkingTo: "knightBattle",
        fightingNow: true,
        page: 0,
        currDialogue: fightDialogue,
        enemyHP: store.getState().knight.health,
        eMaxHP: store.getState().knight.health, 
      }
    });

  }
  function fightingGoblinNow() {
    const fightDialogue = [
      "YOU WON'T LAST A SECOND AGAINST ME",
      " I to Attack \xa0\xa0\xa0\xa0 L to Heal"
    ];
    store.dispatch({
      type: "FIGHTING_NOW",
      payload: {
        fightingNow: true,
        visibility: "hidden",
        talkingTo: "goblinBattle",
        fightingNow: true,
        page: 0,
        currDialogue: fightDialogue,
        enemyHP: store.getState().goblin.health,
        eMaxHP: store.getState().goblin.health
      }
    });
  }
  function fightingGoblinTwoNow() {
    const fightDialogue = [
      "NOM NOM NOM NOM NOM",
      " I to Attack \xa0\xa0\xa0\xa0 L to Heal"
    ];
    store.dispatch({
      type: "FIGHTING_NOW",
      payload: {
        fightingNow: true,
        visibility: "hidden",
        talkingTo: "goblinTwoBattle",
        fightingNow: true,
        page: 0,
        currDialogue: fightDialogue,
        enemyHP: store.getState().goblinTwo.health,
        eMaxHP: store.getState().goblinTwo.health
      }
    });
  }
  function fightingBossNow() {
    const fightDialogue = [
      "I WON'T LET YOU ANY FURTHER",
      "WIMP!",
      " I to Attack \xa0\xa0\xa0\xa0 L to Heal"
    ];
    store.dispatch({
      type: "FIGHTING_NOW",
      payload: {
        fightingNow: true,
        visibility: "hidden",
        talkingTo: "bossBattle",
        fightingNow: true,
        page: 0,
        currDialogue: fightDialogue,
        enemyHP: store.getState().boss.health,
        eMaxHP: store.getState().boss.health
      }
    });
  }
  //-------------------------------------------------------------CHANGE THIS---- TESTING ONLY ---------------------------------------------------------------------------------------------------------------------------
  function signDisplayNoneBadFunctionChangeThis() {
    store.dispatch({
      type: "SHOW_SIGN",
      payload: {
        display: "none"
      }
    });
  }
  //-------------------------------------------------------------CHANGE THIS---- TESTING ONLY ---------------------------------------------------------------------------------------------------------------------------

  //=================================================================================================================================

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 87:
        return attemptMove("up");
      case 38:
        return attemptMove("up");
      case 83:
        return attemptMove("down");
      case 40:
        return attemptMove("down");
      case 65:
        return attemptMove("left");
      case 37:
        return attemptMove("left");
      case 68:
        return attemptMove("right");
      case 39:
        return attemptMove("right");
      case 32:
        return startDialogue("interact");
      case 73:
        return fightInteract("heal");
      case 74:
        return startDialogue("accept"), checkFightStatus("accept");
      case 75:
        return startDialogue("decline");
      case 76:
        return fightInteract("attack");

      default:
        // console.log(e.keyCode);
    }
  }

  function fightInteract(attackInput) {
    if (store.getState().player.fightingNow) {
      fight(attackInput);
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  return player;
}
