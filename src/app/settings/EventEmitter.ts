import type {Intersection} from "three";

export interface EventMap {
    click: Intersection[];
    mousemove: Intersection[];
    [key: string]: any;
}

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

    on(event: string, callback: (intersects: Intersection[]) => void) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    onClick<T extends object>(object: T, callback: EventCallback) {
        if (!this.objectEvents.has(object)) {
            this.objectEvents.set(object, new Map());
        }

        const objectEventMap = this.objectEvents.get(object)!;
        const eventKey = `click_${Date.now()}_${Math.random()}`;
        objectEventMap.set(eventKey, callback);

        // @ts-ignore
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
        let lastIntersect: Intersection | null = null;

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

                lastIntersect = intersect;
            } else {
                if (wasHovered) {
                    this.hoverStates.set(object, false);
                    handlers.onLeave?.();
                    lastIntersect = null;
                }
            }
        };

        this.on('mousemove', moveHandler);

        // Возвращаем объект с методами управления
        return {
            unsubscribe: () => {
                this.off('mousemove', moveHandler);
                this.hoverStates.delete(object);
            },
            isHovered: () => this.hoverStates.get(object) || false,
            getLastIntersect: () => lastIntersect
        };
    }

    offObject(object: object, eventKey?: string) {
        if (!this.objectEvents.has(object)) return;

        if (eventKey) {
            const objectEventMap = this.objectEvents.get(object)!;
            objectEventMap.delete(eventKey);
        } else {
            this.objectEvents.delete(object);
            this.hoverStates.delete(object);
        }
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

    off(event: string, callback: EventCallback) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index !== -1) callbacks.splice(index, 1);
        }
    }
}