import { DomainEventClass } from '../../../Shared/domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/eventBus/DomainEventSubscriber';
import { UuidValueObject } from '../../../Shared/domain/UuidValueObject';
import { CourseCreator } from '../../Courses/application/CourseCreator';
import { UserCourseFinishedDomainEvent } from '../domain/UserCourseFinishedDomainEvent';
import { UserFinderDomainService } from '../domain/UserFinderDomainService';
import { UserRepository } from '../domain/UserRepository';
import { UserSuggestedCourseGeneratorDomainService } from '../domain/UserSuggestedCourseGeneratorDomainService';

export class GenerateSuggestedUserCourseOnUserCourseFinished implements DomainEventSubscriber {
	constructor(
		private readonly generator: UserSuggestedCourseGeneratorDomainService,
		private readonly finderDomainService: UserFinderDomainService,
		private readonly repository: UserRepository,
		private readonly courseCreator: CourseCreator
	) {}

	subscribedTo(): DomainEventClass[] {
		return [UserCourseFinishedDomainEvent];
	}

	async on(event: UserCourseFinishedDomainEvent): Promise<void> {
		const user = await this.finderDomainService.run(event.aggregateId);

		const newSuggestedCoursesNames = await this.generator.run([event.courseName]);
		const updatedUser = user.updateSuggestedCourses(newSuggestedCoursesNames);

		await this.createNewCourses(newSuggestedCoursesNames);

		return this.repository.persist(updatedUser);
	}

	private async createNewCourses(courseNames: string[]): Promise<void[]> {
		const createCoursePromises = courseNames.map(name => {
			return this.courseCreator.run(UuidValueObject.random().value, name, '1 week');
		});

		return Promise.all(createCoursePromises);
	}
}
