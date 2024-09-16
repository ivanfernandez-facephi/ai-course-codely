import { EventBus } from '../../../Shared/domain/eventBus/EventBus';
import { CourseFinder } from '../../Courses/application/CourseFinder';
import { UserFinder } from '../../Users/application/UserFinder';
import { UserCourse } from '../domain/UserCourse';

export class UserCourseFinisher {
	constructor(
		private readonly userFinder: UserFinder,
		private readonly courseFinder: CourseFinder,
		private readonly eventBus: EventBus
	) {}

	async run({ id, courseId }: { id: string; courseId: string }): Promise<void> {
		const [user, course] = await Promise.all([
			this.userFinder.run(id),
			this.courseFinder.run(courseId)
		]);

		const updatedCourse = UserCourse.finish({
			userId: user.id,
			courseId: course.id,
			courseName: course.name,
			previousFinishedCourses: user.finishedCourses
		});

		await this.eventBus.publish(updatedCourse.pullDomainEvents());
	}
}
