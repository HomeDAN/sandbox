type TickCallback = () => void;

/**
 * Класс для подписки на событие AnimationLoop
 * Необходим для независимой работы с циклом в каждом
 * объекте индивидуально
 * */
export class Ticker {
    private subscribers: TickCallback[] = [];

    constructor() {}

    /**
     * Метод для сбора объектов, которые подписались на событие
     * */
    subscribe(callback: TickCallback) {
        this.subscribers.push(callback);

        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    /**
     * Метод tick вызывает коллбеки для всех подписанных объектов
     * тем самым запускает циклы у каждого подписчика (точнее
     * позволяет работать с циклом)
     * */
    tick() {
        this.subscribers.forEach(callback => callback());
    }
}