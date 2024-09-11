import EventEmitter from 'events';

import { DomainEvent } from '../../domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../domain/eventBus/DomainEventSubscriber';
import { EventBus } from '../../domain/eventBus/EventBus';

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
	async publish(events: DomainEvent[]): Promise<void> {
		events.forEach((event: DomainEvent) => {
			this.emit(event.eventName, event);
		});

		return Promise.resolve();
	}

	addSubscribers(subscribers: DomainEventSubscriber[]): void {
		subscribers.forEach((subscriber: DomainEventSubscriber) => {
			subscriber.subscribedTo().forEach(eventClass => {
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				this.on(eventClass.EVENT_NAME, subscriber.on.bind(subscriber));
			});
		});
	}
}
