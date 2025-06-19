import {
  atom,
  computed,
  isSignal,
  react,
  unsafe__withoutCapture,
} from "signia";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t, opt) => atom(opt?.name || "", t),
  computed: (fn, _, opt) => computed(opt?.name || "", fn),
  usePeek: (t) => [
    isSignal(t) ? () => unsafe__withoutCapture(() => t.value) : () => t,
    noop,
  ],
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
