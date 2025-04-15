import { ref, computed, watchEffect, toValue } from "vue";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: ref,
  computed: (fn) => computed(fn),
  toValue: (t) => toValue(t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    return watchEffect(
      (onCleanup) => {
        onCleanup(fn() || noop);
      },
      { flush: "sync" }
    );
  },
};
