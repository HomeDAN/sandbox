// tweakpane.d.ts
import { BladeController, View } from '@tweakpane/core';

declare module '@tweakpane/core' {
    interface BladeApi<C extends BladeController<View>> {
        on(event: string, handler: (ev: BindingApiEvents<Ex>) => void): void;
        off(event: string, handler: (ev: any) => void): void;
        dispose(): void;
    }
}

declare module 'tweakpane' {
    interface Pane {
        addBlade(params: any): any;
    }
}