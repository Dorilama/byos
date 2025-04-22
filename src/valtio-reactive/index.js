import { proxy } from "valtio/vanilla";
import { computed, effect } from "valtio-reactive";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => proxy({ value: t }),
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
