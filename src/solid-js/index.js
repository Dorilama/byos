import {
  createSignal,
  createMemo,
  createRenderEffect,
  onCleanup,
} from "solid-js";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => createSignal(t),
  computed: (fn) => createMemo(fn),
  computedCleanup: noop,
  toValue: (t) => {
    if (Array.isArray(t) && isFunction(t[0])) {
      return t[0]();
    }
    return isFunction(t) ? /** @type {(...args: any[]) => any} */ (t)() : t;
  },
  /**
   *
   * @template Z
   * @param {import("..").Kind<import(".").SignalHKT,Z>} s
   * @param {Z} t
   */
  setValue: (s, t) => {
    s[1](/** @type {Exclude<Z, Function>} */ (t));
  },
  effect: (fn) => {
    createRenderEffect(() => {
      onCleanup(fn() || noop);
    });
    return noop;
  },
};
