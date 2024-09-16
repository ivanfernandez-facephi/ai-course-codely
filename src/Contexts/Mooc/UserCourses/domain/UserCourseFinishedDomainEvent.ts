import { DomainEvent, DomainEventPrimitives } from '../../../Shared/domain/eventBus/DomainEvent';

export type UserCourseFinishedDomainEventAttributes = {
	userId: string;
	courseName: string;
	previousFinishedCourses: string[];
};

export class UserCourseFinishedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'mooc.usercourse.finished';

	readonly userId: string;

	readonly courseName: string;

	private readonly _previousFinishedCourses: string[];

	public get previousFinishedCourses(): string[] {
		return [...this._previousFinishedCourses];
	}

	constructor({
		aggregateId,
		eventName,
		eventId,
		occurredOn,
		userId,
		courseName,
		previousFinishedCourses
	}: {
		aggregateId: string;
		eventName?: string;
		eventId?: string;
		occurredOn?: Date;
		userId: string;
		courseName: string;
		previousFinishedCourses: string[];
	}) {
		super({
			aggregateId,
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			eventName: eventName || UserCourseFinishedDomainEvent.EVENT_NAME,
			eventId,
			occurredOn
		});

		this.userId = userId;
		this.courseName = courseName;
		this._previousFinishedCourses = previousFinishedCourses;
	}

	static fromPrimitives(
		params: DomainEventPrimitives<UserCourseFinishedDomainEventAttributes>
	): UserCourseFinishedDomainEvent {
		return new UserCourseFinishedDomainEvent({
			aggregateId: params.aggregateId,
			eventName: params.eventName,
			eventId: params.eventId,
			occurredOn: params.occurredOn,
			userId: params.attributes.userId,
			courseName: params.attributes.courseName,
			previousFinishedCourses: [...params.attributes.previousFinishedCourses]
		});
	}

	toPrimitives(): DomainEventPrimitives<UserCourseFinishedDomainEventAttributes> {
		return {
			aggregateId: this.aggregateId,
			eventId: this.eventId,
			eventName: this.eventName,
			occurredOn: this.occurredOn,
			attributes: {
				userId: this.userId,
				courseName: this.courseName,
				previousFinishedCourses: this.previousFinishedCourses
			}
		};
	}
}
