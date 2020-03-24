const initialState = {
  hasCombat: false,
  position: [200, 80],
  dialogue: [
    "There is a wizard at the bottom of this dungeon.",
    "He stole your wallet.",
    "And called you a wimp!",
    "Are you gonna take that?!?!?!?!",
    "GO BEAT HIM UP!"
  ],
  response: null,
  hasCombat: false,
  name: "Sign",
  display: "flex",
  visibility:" visible"
};

const signReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_DIALOGUE":
      return {
        ...state,
        ...action.payload
      };
    case "SHOW_SIGN":
      return {
        ...state,
        display: action.payload.display
      };
    default:
      return state;
  }
};

export default signReducer;
