import store from "../../../config/store";

export default function drawBoss() {
    if (store.getState().map.name === "Stage3"){
      store.dispatch({
        type: "BOSS_DISPLAY_INITIAL",
        payload: {  
          position: [600, 240],
          display: "flex"
        }
      });
    }
  }