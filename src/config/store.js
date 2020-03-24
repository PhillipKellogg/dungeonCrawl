import { createStore, combineReducers } from "redux";
import playerReducer from "../components/player/reducer";
import mapReducer from "../components/map/reducer";
import signReducer from "../components/npc/sign/reducer";
import signReducerTwo from "../components/npc/signTwo/reducer";

import knightReducer from "../components/npc/knight/reducer";
import goblinReducer from "../components/npc/goblin/reducer";
import goblinReducerTwo from "../components/npc/goblinTwo/reducer";
import bossReducer from "../components/npc/boss/reducer";

// import dialogueReducer from "../components/dialogue/reducer";

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  knight: knightReducer,
  goblin: goblinReducer,
  goblinTwo: goblinReducerTwo,
  boss: bossReducer,
  sign: signReducer,
  signTwo: signReducerTwo
  // dialogue: dialogueReducer
  // npc: {
  // }
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
