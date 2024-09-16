import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UuidValueObject } from '../../../Shared/domain/UuidValueObject';
import { UserCourseAlreadyFinished } from './UserCourseAlreadyFinished';
import { UserCourseFinishedDomainEvent } from './UserCourseFinishedDomainEvent';
import { UserCourseStatus } from './UserCourseStatus';

export type UserCoursePrimitives = {
	userId: string;
	courseId: string;
	status: UserCourseStatus;
};

export class UserCourse extends AggregateRoot {
	readonly userId: string;

	readonly courseId: string;

	readonly status: UserCourseStatus;

	constructor({
		userId,
		courseId,
		status
	}: {
		userId: string;
		courseId: string;
		status: UserCourseStatus;
	}) {
		super();

		this.userId = userId;
		this.courseId = courseId;
		this.status = status;
	}

	static fromPrimitives(plainData: UserCoursePrimitives): UserCourse {
		return new UserCourse({
			...plainData
		});
	}

	static finish({
		userId,
		courseId,
		courseName,
		previousFinishedCourses
	}: {
		userId: string;
		courseId: string;
		courseName: string;
		previousFinishedCourses: string[];
	}): UserCourse {
		if (previousFinishedCourses.includes(courseName)) {
			throw new UserCourseAlreadyFinished({ id: userId, courseName });
		}

		const userCourse = new UserCourse({ userId, courseId, status: UserCourseStatus.FINISHED });

		userCourse.record(
			new UserCourseFinishedDomainEvent({
				aggregateId: UuidValueObject.random().value,
				userId,
				courseName,
				previousFinishedCourses
			})
		);

		return userCourse;
	}

	toPrimitives(): UserCoursePrimitives {
		return {
			userId: this.userId,
			courseId: this.courseId,
			status: this.status
		};
	}
}
