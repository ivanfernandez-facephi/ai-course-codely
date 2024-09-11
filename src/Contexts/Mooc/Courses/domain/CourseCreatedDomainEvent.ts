import { DomainEvent, DomainEventPrimitives } from '../../../Shared/domain/eventBus/DomainEvent';

export type CourseCreatedAttributes = {
	name: string;
};

export class CourseCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'mooc.course.created';

	readonly name: string;

	constructor({
		aggregateId,
		eventId,
		occurredOn,
		name
	}: {
		aggregateId: string;
		eventName?: string;
		eventId?: string;
		occurredOn?: Date;
		name: string;
	}) {
		super({
			aggregateId,
			eventName: CourseCreatedDomainEvent.EVENT_NAME,
			eventId,
			occurredOn
		});

		this.name = name;
	}

	static fromPrimitives(
		params: DomainEventPrimitives<CourseCreatedAttributes>
	): CourseCreatedDomainEvent {
		return new CourseCreatedDomainEvent({ ...params, name: params.attributes.name });
	}

	toPrimitives(): DomainEventPrimitives<CourseCreatedAttributes> {
		return {
			aggregateId: this.aggregateId,
			eventName: this.eventName,
			occurredOn: this.occurredOn,
			eventId: this.eventId,
			attributes: {
				name: this.name
			}
		};
	}
}
