import { blur } from './blur'
import { elastic } from './elastic'
import { fade } from './fade'
import { flip } from './flip'
import { glitch } from './glitch'
import { liquid } from './liquid'
import { slide } from './slide'
import { sparkle } from './sparkle'
import { warp } from './warp'
import { zoom } from './zoom'
import type { MoboxEffectComponent } from './types'

export type { MoboxEffectComponent, EffectParts, EffectResult } from './types'

const registry = new Map<string, MoboxEffectComponent>()

/** Register a custom effect component. Later registrations override by name. */
export function registerEffect(effect: MoboxEffectComponent): void {
  registry.set(effect.name, effect)
}

export function getEffect(name: string): MoboxEffectComponent | undefined {
  return registry.get(name)
}

export function effectNames(): string[] {
  return [...registry.keys()]
}

export const builtinEffects: MoboxEffectComponent[] = [
  fade,
  zoom,
  flip,
  slide,
  blur,
  glitch,
  liquid,
  warp,
  elastic,
  sparkle,
]

builtinEffects.forEach(registerEffect)
