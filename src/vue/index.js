import {
  ref,
  computed,
  watch,
  toValue,
  getCurrentScope,
  onScopeDispose,
  shallowRef,
} from "vue";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  /**
   * @template T
   * @param {T} t
   * @param {{deep?: boolean}} [opt]
   * @returns
   */
  signal: (t, opt) => {
    if (opt?.deep) {
      return /** @type {import("vue").Ref<T>} */ (ref(t));
    }
    return shallowRef(t);
  },
  computed: (fn) => computed(fn),
  usePeek: (t) => [() => toValue(t), noop],
  toValue: (t) => toValue(t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn, deps) => {
    return watch(
      deps,
      (_, __, onCleanup) => {
        const teardown = fn() || noop;
        if (getCurrentScope()) {
          onScopeDispose(teardown);
        }
        onCleanup(teardown);
      },
      { immediate: true }
    );
  },
});
