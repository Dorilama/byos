import { signal, computed, effect, effectScope } from "alien-signals";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  computed: (fn) => computed(fn),
  toValue: (t) => (isFunction(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect: (fn) => {
    let cleanup = noop;
    const stopEffect = effectScope(() => {
      effect(() => {
        cleanup();
        cleanup = fn() || noop;
      });
    });
    return () => {
      cleanup();
      stopEffect();
    };
  },
};
