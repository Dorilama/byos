import {
  createSignal,
  createMemo,
  createRenderEffect,
  onCleanup,
  createRoot,
  untrack,
} from "solid-js";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => createSignal(t),
  computed: (fn) => createMemo(fn),
  usePeek: (t) => {
    if (Array.isArray(t) && isFunction(t[0])) {
      return [() => untrack(t[0]), noop];
    }
    if (isFunction(t)) {
      return [() => untrack(/** @type {(...args: any[]) => any} */ (t)), noop];
    }
    return [() => t, noop];
  },
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
    let teardown = noop;
    createRoot((dispose) => {
      teardown = dispose;
      createRenderEffect(() => {
        onCleanup(fn() || noop);
      });
    });

    return teardown;
  },
});
