import { atom, computed, isSignal, react } from "signia";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, n = "") => atom(n, t),
  computed: (fn, _, n = "") => computed(n, fn),
  computedCleanup: noop,
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn, _, n = "") => {
    let teardown = noop;
    const stop = react(n, () => {
      teardown();
      teardown = fn() || noop;
    });
    return () => {
      teardown();
      stop();
    };
  },
};
