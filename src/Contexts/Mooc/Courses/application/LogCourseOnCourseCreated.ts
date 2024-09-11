import { DomainEvent, DomainEventClass } from '../../../Shared/domain/eventBus/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/eventBus/DomainEventSubscriber';
import { CourseCreatedDomainEvent } from '../domain/CourseCreatedDomainEvent';

export class LogCourseOnCourseCreated implements DomainEventSubscriber {
	subscribedTo(): DomainEventClass[] {
		return [CourseCreatedDomainEvent];
	}

	async on(event: DomainEvent): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		console.log(
			`💻 CourseCreatedDomainEvent event received: ${JSON.stringify(event.toPrimitives())}`
		);

		return Promise.resolve();
	}
}
