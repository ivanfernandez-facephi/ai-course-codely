import { UuidValueObject } from '../UuidValueObject';

export type DomainEventAttributes = any;

export type DomainEventPrimitives<T extends DomainEventAttributes> = {
	aggregateId: string;
	eventId: string;
	occurredOn: Date;
	eventName: string;
	attributes: T;
};

export abstract class DomainEvent {
	static EVENT_NAME: string;
	static fromPrimitives: (
		params: DomainEventPrimitives<DomainEventAttributes>
		// eslint-disable-next-line no-use-before-define
	) => DomainEvent;

	readonly aggregateId: string;

	readonly eventId: string;

	readonly occurredOn: Date;

	readonly eventName: string;

	constructor(params: {
		eventName: string;
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		const { aggregateId, eventName, eventId, occurredOn } = params;
		this.aggregateId = aggregateId;
		this.eventName = eventName;
		this.eventId = eventId ?? UuidValueObject.random().value;
		this.occurredOn = occurredOn ?? new Date();
	}

	abstract toPrimitives(): DomainEventPrimitives<unknown>;
}

export type DomainEventClass = {
	EVENT_NAME: string;
	fromPrimitives(params: DomainEventPrimitives<DomainEventAttributes>): DomainEvent;
};
