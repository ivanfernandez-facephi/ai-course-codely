import { DomainEventSubscribers } from '../../../../Contexts/Shared/domain/eventBus/DomainEventSubscribers';
import { EventBus } from '../../../../Contexts/Shared/domain/eventBus/EventBus';
import container from '.';

export const registerSubscribers = (): void => {
	const domainEventSubscribers = container.get<DomainEventSubscribers>(
		'Contexts.mooc.Shared.DomainEventSubscribers'
	);

	const eventBus = container.get<EventBus>('Contexts.mooc.Shared.EventBus');

	const subscribers = domainEventSubscribers.search();

	eventBus.addSubscribers(subscribers);
};
