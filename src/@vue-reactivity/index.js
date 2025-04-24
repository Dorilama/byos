import { ref, computed, effect, toValue, shallowRef } from "@vue/reactivity";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: ref,
  shallow: shallowRef,
  computed: (fn) => computed(fn),
  computedCleanup: noop,
  toValue: (t) => toValue(t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    let teardown = noop;
    const runner = effect(() => {
      teardown();
      teardown = fn() || noop;
    });
    return () => {
      teardown();
      runner.effect.stop();
    };
  },
};
