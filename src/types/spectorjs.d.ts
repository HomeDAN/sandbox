// spectorjs.d.ts
declare module 'spectorjs' {
    export interface CaptureOptions {
        captureTracing?: boolean;
        captureCallStack?: boolean;
        callStackLength?: number;
    }

    export interface SpectorOptions {
        capture: CaptureOptions;
    }

    export interface CaptureResult {
        json: () => string;
        toJSON: () => any;
    }

    export class Spector {
        constructor(options?: Partial<SpectorOptions>);

        displayUI(): void;
        displayUIAsync(): Promise<void>;

        captureNextFrame(): Promise<CaptureResult>;
        captureFrames(count: number): Promise<CaptureResult[]>;

        startCapture(options?: Partial<CaptureOptions>): void;
        stopCapture(): void;

        onCapture: (capture: CaptureResult) => void;
        onError: (error: Error) => void;

        clear(): void;
        save(): void;

        addEventListener(event: string, callback: Function): void;
        removeEventListener(event: string, callback: Function): void;
    }
}