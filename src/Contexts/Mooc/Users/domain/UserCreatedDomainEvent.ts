import { DomainEvent, DomainEventPrimitives } from '../../../Shared/domain/eventBus/DomainEvent';

export type UserCreatedAttributes = {
	name: string;
	email: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'mooc.user.created';

	readonly name: string;

	readonly email: string;

	constructor({
		aggregateId,
		eventName,
		eventId,
		occurredOn,
		name,
		email
	}: {
		aggregateId: string;
		eventName?: string;
		eventId?: string;
		occurredOn?: Date;
		name: string;
		email: string;
	}) {
		super({
			aggregateId,
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			eventName: eventName || UserCreatedDomainEvent.EVENT_NAME,
			eventId,
			occurredOn
		});

		this.name = name;
		this.email = email;
	}

	static fromPrimitives(
		params: DomainEventPrimitives<UserCreatedAttributes>
	): UserCreatedDomainEvent {
		return new UserCreatedDomainEvent({
			aggregateId: params.aggregateId,
			eventName: params.eventName,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			name: params.attributes.name,
			email: params.attributes.email
		});
	}

	toPrimitives(): DomainEventPrimitives<UserCreatedAttributes> {
		return {
			aggregateId: this.aggregateId,
			eventId: this.eventId,
			eventName: this.eventName,
			occurredOn: this.occurredOn,
			attributes: {
				name: this.name,
				email: this.email
			}
		};
	}
}
