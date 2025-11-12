import { HKT, SignalFunctions, Kind } from "../index";
import { Signal } from "./signal";

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, SignalHKT>;

export const signalFunctions: SFN;

export function nordcraftSignalFunctions(
  signal: <T>(value: T) => Kind<SignalHKT, T>
): SFN;
