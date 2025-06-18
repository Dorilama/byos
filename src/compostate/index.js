import { atom, computed, syncEffect, onCleanup } from "compostate";

/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => atom(t),
  computed: (fn) => computed(fn),
  toValue: (t) => (isFunction(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect: (fn) =>
    syncEffect(() => {
      onCleanup(fn() || noop);
    }),
});
