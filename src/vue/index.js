import {
  ref,
  computed,
  watchEffect,
  toValue,
  getCurrentScope,
  onScopeDispose,
} from "vue";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: ref,
  computed: (fn) => computed(fn),
  computedCleanup: noop,
  toValue: (t) => toValue(t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    return watchEffect(
      (onCleanup) => {
        const teardown = fn() || noop;
        if (getCurrentScope()) {
          onScopeDispose(teardown);
        }
        onCleanup(teardown);
      }
      // { flush: "sync" }
    );
  },
};
