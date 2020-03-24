const initialState = {
  position: [80, 240],
  spriteLocation: "0px 0px",
  direction: "down",
  walkIndex: 0,
  currDialogue: null,
  page: 0,
  canFight: false,
  inCombat: false,
  fighter: null,
  talkingTo: null,
  finalPage: false,
  fightingNow: false,
  visibility: "visible",
  health: 20,
  enemyHealth: null,
  eMaxHP: null,
  prevMap: null,
  prevMapName: null

};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return { ...state, ...action.payload };
      case "PREV_MAP":
        return { ...state,   
           prevMap: action.payload.prevMap,  
          prevMapName: action.payload.prevMapName};
    case "CHANGE_PAGE":
      return {
        ...state,
        page: state.page + action.payload.value,
        finalPage: action.payload.finalPage
      };
      case "POSITION_CHANGE":
        return {
          ...state,
          position: action.payload.position
        };
    case "COMBAT":
      return { ...state, inCombat: action.payload.inCombat };
    case "FIGHTING_NOW":
      return {
        ...state,
        fightingNow: action.payload.fightingNow,
        visibility: action.payload.visibility,
        talkingTo: action.payload.talkingTo,
        currDialogue: action.payload.currDialogue,
        finalPage: action.payload.finalPage,
        enemyHealth: action.payload.enemyHP,
        eMaxHP: action.payload.eMaxHP,
        page: action.payload.page,
     
      };
    case "FIGHT_SEQUENCE":
      return {
        ...state,
        currDialogue: action.payload.currDialogue,
        health: action.payload.health,
        enemyHealth: action.payload.enemyHealth,
        page: action.payload.page,
        fightingNow: action.payload.fightingNow
      };
    case "VISIBILITY":
      return {
        ...state,
        visibility: action.payload.visibility
      };
    default:
      return state;
  }
};

export default playerReducer;
