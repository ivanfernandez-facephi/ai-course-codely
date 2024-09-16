import { DomainEventClass } from '../../../Shared/domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/eventBus/DomainEventSubscriber';
import { UserCourseFinishedDomainEvent } from '../../UserCourses/domain/UserCourseFinishedDomainEvent';
import { UserFinderDomainService } from '../domain/UserFinderDomainService';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UpdateFinishedCoursesOnUserCourseFinished implements DomainEventSubscriber {
	constructor(
		private readonly repository: UserRepository,
		private readonly finderDomainService: UserFinderDomainService
	) {}

	subscribedTo(): DomainEventClass[] {
		return [UserCourseFinishedDomainEvent];
	}

	async on(event: UserCourseFinishedDomainEvent): Promise<void> {
		const user = await this.finderDomainService.run(new UserId(event.userId));

		const updatedUser = user.updateFinishedCourses(event.courseName);

		return this.repository.persist(updatedUser);
	}
}
