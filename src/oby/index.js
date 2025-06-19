import $ from "oby";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => $(t),
  computed: (fn) => $.memo(fn),
  usePeek: (t) => [() => $.untrack(t), noop],
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
});
