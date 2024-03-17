import { getState, dispatch, subscribe } from "./modules/store.js";
import { add, subtract, reset } from "./modules/actions.js";

subscribe((prev, next) => {
  console.log("Previous state:", prev);
  console.log("Next state:", next);
});

getState();

dispatch(add());
dispatch(add());
dispatch(subtract());
dispatch(reset());
