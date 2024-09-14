import { DomainEvent, DomainEventPrimitives } from '../../../Shared/domain/eventBus/DomainEvent';

export type UserCourseFinishedDomainEventAttributes = {
	courseName: string;
};

export class UserCourseFinishedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'mooc.user.course.finished';

	readonly courseName: string;

	constructor({
		aggregateId,
		eventName,
		eventId,
		occurredOn,
		courseName
	}: {
		aggregateId: string;
		eventName?: string;
		eventId?: string;
		occurredOn?: Date;
		courseName: string;
	}) {
		super({
			aggregateId,
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			eventName: eventName || UserCourseFinishedDomainEvent.EVENT_NAME,
			eventId,
			occurredOn
		});

		this.courseName = courseName;
	}

	static fromPrimitives(
		params: DomainEventPrimitives<UserCourseFinishedDomainEventAttributes>
	): UserCourseFinishedDomainEvent {
		return new UserCourseFinishedDomainEvent({
			aggregateId: params.aggregateId,
			eventName: params.eventName,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			courseName: params.attributes.courseName
		});
	}

	toPrimitives(): DomainEventPrimitives<UserCourseFinishedDomainEventAttributes> {
		return {
			aggregateId: this.aggregateId,
			eventId: this.eventId,
			eventName: this.eventName,
			occurredOn: this.occurredOn,
			attributes: {
				courseName: this.courseName
			}
		};
	}
}
