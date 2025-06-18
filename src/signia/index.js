import { atom, computed, isSignal, react } from "signia";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t, opt) => atom(opt?.name || "", t),
  computed: (fn, _, opt) => computed(opt?.name || "", fn),
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn, _, opt) => {
    let teardown = noop;
    const stop = react(opt?.name || "", () => {
      teardown();
      teardown = fn() || noop;
    });
    return () => {
      teardown();
      stop();
    };
  },
});
