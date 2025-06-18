import { signal, computed, effect, effectScope } from "alien-signals";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal,
  computed: (fn) => computed(fn),
  toValue: (t) => (isFunction(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect: (fn) => {
    let teardown = noop;
    const stopEffect = effectScope(() => {
      effect(() => {
        teardown();
        teardown = fn() || noop;
      });
    });
    return () => {
      teardown();
      stopEffect();
    };
  },
});
