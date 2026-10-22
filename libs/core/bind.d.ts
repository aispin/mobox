import type { MoboxSceneData } from './types';
/**
 * Bind a data object onto template nodes.
 * A key `title` fills `.mobox-title` elements and any `[data-title]` element.
 */
export declare function bindData(root: HTMLElement, data: MoboxSceneData, hideNull: boolean): void;
