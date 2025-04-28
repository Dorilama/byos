import { Reactive, onCleanup, autoStabilize } from "@reactively/core";

autoStabilize();
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, opt) => new Reactive(t, false, opt?.name),
  computed: (fn, _, opt) => new Reactive(fn, false, opt?.name),
  computedCleanup: noop,
  toValue: (t) => (t instanceof Reactive ? t.get() : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn, _, opt) => {
    const e = new Reactive(
      () => {
        onCleanup(fn() || noop);
      },
      true,
      opt?.name
    );
    return () => {
      e.cleanups.forEach((c) => c(e.value));
      e.cleanups = [];
      // @ts-ignore
      e.effect = false;
    };
  },
};
