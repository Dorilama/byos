import $ from "oby";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => $(t),
  computed: (fn) => $.memo(fn),
  computedCleanup: noop,
  toValue: (t) => ($.isObservable(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect: (fn) =>
    $.effect(
      () => {
        $.cleanup(fn() || noop);
      }
      // { sync: true }
    ),
};
