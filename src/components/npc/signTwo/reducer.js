const initialState = {
  hasCombat: false,
  position: [240, 80],
  dialogue: [
    "I'm nothing like sign1, I respect you.",
    "Please leave",
    "You're a persistent one!",
    "...",
    "............................................."
  ],
  response: null,
  dialogueTrue: "ok Bye",
  dialogueFalse: "please stop reading",
  hasCombat: false,
  name: "Sign",
  display: "flex"
};

const signReducerTwo = (state = initialState, action) => {
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

export default signReducerTwo;
