import { EventBus } from '../../../Shared/domain/eventBus/EventBus';
import { CourseFinder } from '../../Courses/application/CourseFinder';
import { UserRepository } from '../domain/UserRepository';
import { UserFinder } from './UserFinder';

export class UserCourseFinisher {
	constructor(
		private readonly repository: UserRepository,
		private readonly finder: UserFinder,
		private readonly courseFinder: CourseFinder,
		private readonly eventBus: EventBus
	) {}

	async run({ id, courseId }: { id: string; courseId: string }): Promise<void> {
		const [user, course] = await Promise.all([
			this.finder.run(id),
			this.courseFinder.run(courseId)
		]);

		const updatedCourse = user.finishCourse(course.name);

		await this.repository.persist(updatedCourse);
		await this.eventBus.publish(updatedCourse.pullDomainEvents());
	}
}
