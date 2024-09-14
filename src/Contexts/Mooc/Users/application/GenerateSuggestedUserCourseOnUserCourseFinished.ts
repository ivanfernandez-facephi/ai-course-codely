import { DomainEventClass } from '../../../Shared/domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/eventBus/DomainEventSubscriber';
import { UserCourseFinishedDomainEvent } from '../domain/UserCourseFinishedDomainEvent';
import { UserFinderDomainService } from '../domain/UserFinderDomainService';
import { UserRepository } from '../domain/UserRepository';
import { UserSuggestedCourseGeneratorDomainService } from '../domain/UserSuggestedCourseGeneratorDomainService';

export class GenerateSuggestedUserCourseOnUserCourseFinished implements DomainEventSubscriber {
	constructor(
		private readonly generator: UserSuggestedCourseGeneratorDomainService,
		private readonly finderDomainService: UserFinderDomainService,
		private readonly repository: UserRepository
	) {}

	subscribedTo(): DomainEventClass[] {
		return [UserCourseFinishedDomainEvent];
	}

	async on(event: UserCourseFinishedDomainEvent): Promise<void> {
		const user = await this.finderDomainService.run(event.aggregateId);

		const newSuggestedCourseName = await this.generator.run([event.courseName]);

		const updatedUser = user.updateSuggestedCourses(newSuggestedCourseName);

		return this.repository.persist(updatedUser);
	}
}
