import { Signal, signal, computed, effect } from "@preact/signals-core";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  computed: (fn) => [computed(fn), () => {}],
  toValue:
    /**
     * @template Z
     * @param {import("..").MaybeSignal<import(".").SignalHKT,Z>} t
     * @returns
     */
    (t) => (t instanceof Signal ? /**@type {Signal<Z>} */ (t).value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect,
};
