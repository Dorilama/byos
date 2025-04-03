import { signal, computed, effect } from "alien-signals";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  computed,
  toValue: (t) => (isFunction(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect,
};
