import knight from ".";
import store from "../../../config/store";
import goblinLarge from "../../../assets/npc/goblinLarge.png";
import sprite from "./../../../assets/npc/goblin.png";
const initialState = {
  position: [720, 80],
  spriteLocation: "0px 0px",
  walkIndex: 1,
  dialogue: [
    "HOW DARE YOU BEAT UP MY BROTHER!",
    "PREPARE TO DIE!" /// START COMBAT
  ],
  hasCombat: true,
  interval: 0,
  name: "goblin",
  inCombat: false,
  stillFrame: sprite,
  bgSize: "",
  width: "40px",
  height: "40px",
  fightReducer: "DRAW_FIGHT",
  health: 20,
  display: "none",
  visibility: "visible"
};

const goblinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOBLIN_ANIMATE":
      return {
        ...state,
        ...action.payload
      };
      case "DRAW_GOBLIN":
        return {
          ...state,
          display:action.payload.display
        };
    case "UPDATE_INTERVAL_GOBLIN":
      return {
        ...state,
        interval: action.payload.interval,
        position: action.payload.position,
        spriteLocation: action.payload.spriteLocation
      };
      case "DRAW_FIGHT_G1":
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
    case "GOBLIN_DISPLAY":
      return {
        ...state,
        position: [-40, -40],
        display: action.payload.display
      };
      case "GOBLIN_VISIBILITY":
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

export default goblinReducer;
