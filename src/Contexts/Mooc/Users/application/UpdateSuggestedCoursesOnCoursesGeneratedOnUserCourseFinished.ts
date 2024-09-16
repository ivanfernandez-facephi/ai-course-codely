import { DomainEventClass } from '../../../Shared/domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/eventBus/DomainEventSubscriber';
import { CoursesGeneratedOnUserCourseFinishedDomainEvent } from '../../Courses/domain/CoursesGeneratedOnUserCourseFinishedDomainEvent';
import { UserFinderDomainService } from '../domain/UserFinderDomainService';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UpdateSuggestedCoursesOnCoursesGeneratedOnUserCourseFinished
	implements DomainEventSubscriber
{
	constructor(
		private readonly repository: UserRepository,
		private readonly finderDomainService: UserFinderDomainService
	) {}

	subscribedTo(): DomainEventClass[] {
		return [CoursesGeneratedOnUserCourseFinishedDomainEvent];
	}

	async on(event: CoursesGeneratedOnUserCourseFinishedDomainEvent): Promise<void> {
		const user = await this.finderDomainService.run(new UserId(event.userId));

		const updatedUser = user.updateSuggestedCourses([...event.names]);

		return this.repository.persist(updatedUser);
	}
}
