import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface DomainEventSubscriber {
	subscribedTo(): DomainEventClass[];

	on(event: DomainEvent): Promise<void>;
}
