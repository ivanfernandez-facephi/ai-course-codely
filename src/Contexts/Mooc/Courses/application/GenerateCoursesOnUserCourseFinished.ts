import { DomainEventClass } from '../../../Shared/domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/eventBus/DomainEventSubscriber';
import { EventBus } from '../../../Shared/domain/eventBus/EventBus';
import { UuidValueObject } from '../../../Shared/domain/UuidValueObject';
import { UserCourseFinishedDomainEvent } from '../../UserCourses/domain/UserCourseFinishedDomainEvent';
import { Course } from '../domain/Course';
import { CourseGeneratorDomainService } from '../domain/CourseGeneratorDomainService';
import { CourseRepository } from '../domain/CourseRepository';
import { CoursesGeneratedOnUserCourseFinishedDomainEvent } from '../domain/CoursesGeneratedOnUserCourseFinishedDomainEvent';

export class GenerateCoursesOnUserCourseFinished implements DomainEventSubscriber {
	constructor(
		private readonly generator: CourseGeneratorDomainService,
		private readonly repository: CourseRepository,
		private readonly eventBus: EventBus
	) {}

	subscribedTo(): DomainEventClass[] {
		return [UserCourseFinishedDomainEvent];
	}

	async on(event: UserCourseFinishedDomainEvent): Promise<void> {
		const newSuggestedCoursesPrimitives = await this.generator.run([
			...event.previousFinishedCourses,
			event.courseName
		]);

		const courses = newSuggestedCoursesPrimitives.map(coursePrimitives =>
			Course.create({
				id: coursePrimitives.id,
				name: coursePrimitives.name,
				duration: coursePrimitives.duration
			})
		);

		const createCoursesPromises = courses.map(course => this.repository.persist(course));

		await Promise.all(createCoursesPromises);

		return this.eventBus.publish(
			courses
				.map(course => course.pullDomainEvents())
				.flat()
				.concat(
					new CoursesGeneratedOnUserCourseFinishedDomainEvent({
						aggregateId: UuidValueObject.random().value,
						userId: event.userId,
						names: courses.map(course => course.name)
					})
				)
		);
	}
}
