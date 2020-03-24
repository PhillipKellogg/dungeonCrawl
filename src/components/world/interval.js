import store from "../../config/store"

export default function interval(world){
    setInterval(() => {
        dispatchInterval()
    }, 500);

    function dispatchInterval(){
        let intervalTracker = store.getState().global.interval;
        intervalTracker < 10 ? intervalTracker++ : intervalTracker=0;

        store.dispatch({
            type: "UPDATE_INTERVAL_GLOBAL",
            payload: {
                interval: intervalTracker
            }
        });
    }
    return world
}
