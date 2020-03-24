const initialState = {
    interval: 0
  };
  const globalReducer = (state = initialState, action) => {
    switch (action.type) {
    case "UPDATE_INTERVAL_GLOBAL":
        return {

      interval: action.payload.interval
        };
      default:
    return state;
  }
    

}

export default globalReducer;