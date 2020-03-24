import knight from ".";
import store from "../../../config/store";
import goblinLarge from "../../../assets/npc/goblinLarge.png";
import sprite from "./../../../assets/npc/goblin.png";
const initialState = {
  position: [360, 200],
  spriteLocation: "0px 0px",
  walkIndex: 1,
  dialogue: [
    "ANGRY GOBLIN NOISES",
    "FIGHT TIME!!!!!" /// START COMBAT
  ],
  hasCombat: true,
  interval: 0,
  name: "goblinTwo",
  inCombat: false,
  stillFrame: sprite,
  bgSize: "",
  width: "40px",
  height: "40px",
  fightReducer: "DRAW_FIGHT",
  health: 20,
  display: "none"
};

const goblinReducerTwo = (state = initialState, action) => {
  switch (action.type) {
    case "GOBLIN_ANIMATE_TWO":
      return {
        ...state,
        ...action.payload
      };
      case "DRAW_GOBLIN_TWO":
        return {
          ...state,
          display:action.payload.display
        };
    case "UPDATE_INTERVAL_GOBLIN_TWO":
      return {
        ...state,
        interval: action.payload.interval,
        position: action.payload.position,
        spriteLocation: action.payload.spriteLocation
      };
    case "DRAW_FIGHT_G2":
      return {
        ...state,
        position: action.payload.pos,
        spriteLocation: action.payload.sLocation,
        inCombat: action.payload.fighting,
        width: "360px",
        height: "360px",
        bgSize: "cover",
        stillFrame: goblinLarge
      };
    case "GOBLIN_DISPLAY_TWO":
      return {
        ...state,
        position: [-40, -40],
        // position: action.payload.position,
        display: action.payload.display
      };
    default:
      return state;
  }
};

export default goblinReducerTwo;
