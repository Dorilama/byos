import { HKT, SignalFunctions } from "../index";
import { ReadonlySignal, Signal } from "@preact/signals-core";

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ReadonlySignal<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;

export function isSignal<T>(
  t: T | Signal<T>
): t is Signal<T> | ReadonlySignal<T>;
