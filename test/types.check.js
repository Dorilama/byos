/**
 * @template {import("../src").HKT} SignalHKT
 * @template {import("../src").HKT} ComputedHKT
 * @param {import("../src").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
function check(fn) {
  //@ts-expect-error
  fn.computed(() => {});
  //@ts-expect-error
  fn.computed(() => {}, 0);
  //@ts-expect-error
  fn.effect(() => {});
  //@ts-expect-error
  fn.effect(() => {}, 0);

  const t = fn.computed(() => 0, []);
  // @ts-expect-error
  fn.setValue(t, 1);
}
