import type {Intersection} from "three";

export type EventCallback<T = any> = (data: T) => void;

export interface HoverHandlers {
    onEnter?: (intersect: Intersection) => void;
    onLeave?: () => void;
    onMove?: (intersect: Intersection) => void;
}

export class EventEmitter {
    private events: Map<string, EventCallback[]> = new Map();
    private objectEvents: Map<object, Map<string, EventCallback>> = new Map();
    private hoverStates: Map<object, boolean> = new Map();

    private on(event: string, callback: (intersects: Intersection[]) => void) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    emit(event: string, data: Intersection[]) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event ${event} callback:`, error);
                }
            });
        }
    }

    onClick<T extends object>(object: T, callback: EventCallback) {
        if (!this.objectEvents.has(object)) {
            this.objectEvents.set(object, new Map());
        }

        const objectEventMap = this.objectEvents.get(object)!;
        const eventKey = `click_${Date.now()}_${Math.random()}`;
        objectEventMap.set(eventKey, callback);

        this.on("click", (intersects: Intersection[]) => {
            if (Array.isArray(intersects)) {
                const intersect = intersects.find(i => i?.object === object);
                if (intersect) {
                    callback(intersect);
                }
            }
        });

        return eventKey;
    }

    onHover<T extends object>(object: T, handlers: HoverHandlers) {

        this.hoverStates.set(object, false);

        const moveHandler = (intersects: Intersection[]) => {
            if (!Array.isArray(intersects)) {
                console.warn('Expected array of intersects, got:', intersects);
                return;
            }

            const intersect = intersects.find(i => i?.object === object);
            const wasHovered = this.hoverStates.get(object) || false;

            if (intersect) {
                if (!wasHovered) {
                    this.hoverStates.set(object, true);
                    handlers.onEnter?.(intersect);
                }

                if (handlers.onMove) {
                    handlers.onMove(intersect);
                }

            } else {
                if (wasHovered) {
                    this.hoverStates.set(object, false);
                    handlers.onLeave?.();
                }
            }
        };

        this.on('mousemove', moveHandler);
    }
}