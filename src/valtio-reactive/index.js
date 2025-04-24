import { proxy, ref } from "valtio/vanilla";
import { computed, effect } from "valtio-reactive";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => proxy({ value: t }),
  shallow: (t) => {
    if (typeof t === "object" && t) {
      return proxy({ value: ref(t) });
    }
    return proxy({ value: t });
  },
  computed: (fn) => computed({ value: fn }),
  computedCleanup: noop,
  toValue: (t) => (t && typeof t === "object" && "value" in t ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    let teardown = noop;
    return effect(
      () => {
        teardown();
        teardown = fn() || noop;
      },
      () => {
        teardown();
      }
    );
  },
};
