import type { MoboxEffectComponent } from './types';
export type { MoboxEffectComponent, EffectParts, EffectResult } from './types';
/** Register a custom effect component. Later registrations override by name. */
export declare function registerEffect(effect: MoboxEffectComponent): void;
export declare function getEffect(name: string): MoboxEffectComponent | undefined;
export declare function effectNames(): string[];
export declare const builtinEffects: MoboxEffectComponent[];
