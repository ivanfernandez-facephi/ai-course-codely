import { DomainEventSubscriber } from './DomainEventSubscriber';

export interface DomainEventSubscribers {
	search(): DomainEventSubscriber[];
}
