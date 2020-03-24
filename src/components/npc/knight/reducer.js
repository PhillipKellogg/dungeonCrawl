import knight from ".";
import store from "../../../config/store";
import knightSingleFrame from "../../../assets/npc/knightSingleFrame2.png";
import sprite from "./../../../assets/npc/knight.png";
const initialState = {
  position: [720, 200],
  spriteLocation: "0px 0px",
  walkIndex: 1,
  dialogue: [
    "YOU DARE CHALLENGE ME!!!!!!!!!!!!!!!!",
    "LET US COMMENCE BATTLE" /// START COMBAT
  ],
  hasCombat: true,
  interval: 0,
  name: "knight",
  inCombat: false,
  stillFrame: sprite,
  bgSize: "",
  width: "40px",
  height: "40px",
  fightReducer: "DRAW_FIGHT",
  health: 12,
  display: "flex"
};

const knightReducer = (state = initialState, action) => {
  switch (action.type) {
    case "KNIGHT_ANIMATE":
      return {
        ...state,
        ...action.payload
      };
    case "UPDATE_INTERVAL":
      return {
        ...state,
        interval: action.payload.interval,
        position: action.payload.position,
        spriteLocation: action.payload.spriteLocation
      };
    case "DRAW_FIGHT":
      return {
        ...state,
        position: action.payload.pos,
        spriteLocation: action.payload.sLocation,
        inCombat: action.payload.fighting,
        width: "360px",
        height: "360px",
        bgSize: "cover",
        stillFrame: knightSingleFrame
      };
    case "KNIGHT_DISPLAY":
      return {
        ...state,
        position: [-40, -40],
        display: action.payload.display
      };
    default:
      return state;
  }
};

export default knightReducer;
