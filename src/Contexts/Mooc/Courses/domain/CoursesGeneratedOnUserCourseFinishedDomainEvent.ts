import { DomainEvent, DomainEventPrimitives } from '../../../Shared/domain/eventBus/DomainEvent';

export type CoursesCreatedAttributes = {
	names: string[];
	userId: string;
};

export class CoursesGeneratedOnUserCourseFinishedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'mooc.course.generatedOnUserCourseFinishedDomainEvent';

	readonly names: string[];

	readonly userId: string;

	constructor({
		aggregateId,
		eventId,
		occurredOn,
		names,
		userId
	}: {
		aggregateId: string;
		eventName?: string;
		eventId?: string;
		occurredOn?: Date;
		names: string[];
		userId: string;
	}) {
		super({
			aggregateId,
			eventName: CoursesGeneratedOnUserCourseFinishedDomainEvent.EVENT_NAME,
			eventId,
			occurredOn
		});

		this.names = names;
		this.userId = userId;
	}

	static fromPrimitives(
		params: DomainEventPrimitives<CoursesCreatedAttributes>
	): CoursesGeneratedOnUserCourseFinishedDomainEvent {
		return new CoursesGeneratedOnUserCourseFinishedDomainEvent({
			...params,
			names: params.attributes.names,
			userId: params.attributes.userId
		});
	}

	toPrimitives(): DomainEventPrimitives<CoursesCreatedAttributes> {
		return {
			aggregateId: this.aggregateId,
			eventName: this.eventName,
			occurredOn: this.occurredOn,
			eventId: this.eventId,
			attributes: {
				names: this.names,
				userId: this.userId
			}
		};
	}
}
