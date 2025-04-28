import { atom, computed, syncEffect, onCleanup } from "compostate";

/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => atom(t),
  computed: (fn) => computed(fn),
  computedCleanup: noop,
  toValue: (t) => (isFunction(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect: (fn) =>
    syncEffect(() => {
      onCleanup(fn() || noop);
    }),
};
