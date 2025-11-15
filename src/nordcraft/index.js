const noop = () => {};

// nordcraft apps have the signal in the window object
/**
 * @type {import(".").nordcraftSignalFunctions}
 */
export const nordcraftSignalFunctions = (signal) => {
  const sampleSignal = signal(0);
  /**
   *
   * @template T
   * @param {T | import("@nordcraft/runtime/dist/signal/signal").Signal<T>} t
   * @returns {t is import("@nordcraft/runtime/dist/signal/signal").Signal<T>}
   */
  const isSignal = (t) => t instanceof sampleSignal.constructor;
  return {
    signal,
    computed: (fn, deps) => {
      const s = signal(fn());
      const update = () => {
        s.set(fn());
      };
      /**
       * @type {(()=>void)[]}
       */
      const cleanup = [];
      deps?.forEach((d) => {
        if (isSignal(d)) {
          cleanup.push(d.subscribe(update));
        }
      });
      const stop = () => {
        cleanup.forEach((cb, i) => {
          cb();
        });
        cleanup.length = 0;
      };
      s.subscribe(noop, { destroy: stop });
      return s;
    },
    usePeek: (t) => [isSignal(t) ? () => t.get() : () => t, noop],
    computedCleanup: (t) => t.destroy(),
    toValue: (t) => (isSignal(t) ? t.get() : t),
    setValue: (s, t) => {
      s.set(t);
    },
    effect: (fn, deps) => {
      let teardown = noop;
      const update = () => {
        teardown();
        teardown = fn() || noop;
      };
      /**
       * @type {(()=>void)[]}
       */
      const cleanup = [];
      deps?.forEach((d) => {
        if (isSignal(d)) {
          cleanup.push(d.subscribe(update));
        }
      });
      const stop = () => {
        teardown();
        cleanup.forEach((cb) => {
          cb();
        });
        cleanup.length = 0;
      };
      return stop;
    },
  };
};
