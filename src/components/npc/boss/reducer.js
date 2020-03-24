import knight from ".";
import store from "../../../config/store";
import goblinLarge from "../../../assets/npc/goblinLarge.png";
import sprite from "./../../../assets/npc/wizard.png";
import bossSprite from "../../../assets/npc/bossLarge.png"
const initialState = {
  position: [600, 240],
  spriteLocation: "0px 0px",
  walkIndex: 1,
  dialogue: [
    "I WILL FEAST ON YOUR FLESH TONIGHT!!!!!!",
    "FIGHT TIME!!!!!" /// START COMBAT
  ],
  hasCombat: true,
  interval: 0,
  name: "boss",
  inCombat: false,
  stillFrame: sprite,
  bgSize: "",
  width: "40px",
  height: "40px",
  fightReducer: "DRAW_FIGHT",
  health: 25,
  display: "none",
  visibility: "visible",
  class: "inGame"
};

const bossReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOSS_ANIMATE":
      return {
        ...state,
        ...action.payload
      };
      case "DRAW_BOSS":
        return {
          ...state,
          display:action.payload.display
        };
    case "UPDATE_INTERVAL_BOSS":
      return {
        ...state,
        interval: action.payload.interval,
        position: action.payload.position,
        spriteLocation: action.payload.spriteLocation
      };
      case "DRAW_FIGHT_BOSS":
        return {
          ...state,
          position: action.payload.pos,
          spriteLocation: action.payload.sLocation,
          inCombat: action.payload.fighting,
          width: "355px",
          height: "355px",
          bgSize: "cover",
          stillFrame: bossSprite
        };
    case "BOSS_DISPLAY":
      return {
        ...state,
        position: [-40, -40],
        display: action.payload.display
      };
      case "BOSS_DISPLAY_INITIAL":
        return {
          ...state,
          position: action.payload.position,
          display: action.payload.display
        };
      case "BOSS_VISIBILITY":
        return {
          ...state,
          visibility: action.payload.visibility,
          stillFrame: sprite,
          bgSize: "",
        };
    default:
      return state;
  }
};

export default bossReducer;
