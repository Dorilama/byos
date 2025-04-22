import { Reactive, onCleanup, autoStabilize } from "@reactively/core";

autoStabilize();
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, n) => new Reactive(t, false, n),
  computed: (fn, _, n) => new Reactive(fn, false, n),
  computedCleanup: noop,
  toValue: (t) => (t instanceof Reactive ? t.get() : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn, _, n) => {
    const e = new Reactive(
      () => {
        onCleanup(fn() || noop);
      },
      true,
      n
    );
    return () => {
      e.cleanups.forEach((c) => c(e.value));
      e.cleanups = [];
      // @ts-ignore
      e.effect = false;
    };
  },
};
