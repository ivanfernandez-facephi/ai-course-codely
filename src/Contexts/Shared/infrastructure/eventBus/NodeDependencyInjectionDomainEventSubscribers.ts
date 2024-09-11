import container from '../../../../apps/mooc/backend/dependency-injection';
import { DomainEventSubscriber } from '../../domain/eventBus/DomainEventSubscriber';
import { DomainEventSubscribers } from '../../domain/eventBus/DomainEventSubscribers';

export class NodeDependencyInjectionDomainEventSubscribers implements DomainEventSubscribers {
	search(): DomainEventSubscriber[] {
		const taggedSubscribers = container.findTaggedServiceIds('domainEventSubscriber');
		const subscribers: DomainEventSubscriber[] = [];

		for (const taggedSubscriberKey of taggedSubscribers.keys()) {
			const subscriber: DomainEventSubscriber = container.get(taggedSubscriberKey as string);
			subscribers.push(subscriber);
		}

		return subscribers;
	}
}
