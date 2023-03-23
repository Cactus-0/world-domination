import { EventEmitter as _EventEmitter } from 'events';
import type TypedEventEmitter from 'typed-emitter';
import type { EventMap } from 'typed-emitter';

const BaseEventEmitter = _EventEmitter as { new <T extends EventMap>(): TypedEventEmitter<T> };

export class EventEmitter<Events extends EventMap = {}> extends BaseEventEmitter<Events> {
    public waitFor<E extends keyof Events>(event: E): Promise<Parameters<Events[E]>> {
        return new Promise(resolve => {
            // @ts-expect-error
            this.once(event, (...args: any[]) => resolve(args));
        });
    }
}
