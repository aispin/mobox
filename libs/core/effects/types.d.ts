export interface EffectParts {
    /** The .mobox root element */
    root: HTMLElement;
    /** The .mobox-overlay element */
    overlay: HTMLElement;
    /** The .mobox-inner dialog element */
    inner: HTMLElement;
}
export type EffectResult = Animation | Animation[] | void | Promise<void>;
/**
 * A dialog effect is an independent, self-contained component.
 * Implement this interface and pass it to Mobox.registerEffect().
 */
export interface MoboxEffectComponent {
    /** Unique name, used as `effect: 'name'` or `data-effect="name"` */
    name: string;
    /** Enter animation. Returned Animations are awaited before onOpened fires. */
    enter(parts: EffectParts): EffectResult;
    /** Exit animation. Returned Animations are awaited before onClosed fires. */
    exit(parts: EffectParts): EffectResult;
}
