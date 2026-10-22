import React, { type ReactNode } from 'react';
import { type MoboxInstance, type MoboxOptions, type MoboxSceneData } from '@aifire/mobox-core';
export interface MoboxProps extends Omit<MoboxOptions, 'effect'> {
    /** Effect name. Default: 'zoom' */
    effect?: string;
    /** Controlled open state. Omit for uncontrolled mode. */
    open?: boolean;
    /** Initial open state in uncontrolled mode. Default: false */
    defaultOpen?: boolean;
    /** Called whenever the open state changes (overlay click, ESC, API calls) */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
    className?: string;
}
export interface MoboxRef {
    show(data?: MoboxSceneData): void;
    hide(): void;
    toggle(): void;
    readonly instance: MoboxInstance | null;
}
export declare const Mobox: React.ForwardRefExoticComponent<MoboxProps & React.RefAttributes<MoboxRef>>;
