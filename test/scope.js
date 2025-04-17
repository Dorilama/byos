import { createEffect } from "solid-js";

/**
 * @satisfies {Record<string, (...args:any[])=>any>}
 */
const scope = {
  solidJs: (fn) => () => createEffect(fn),
};

export default scope;
