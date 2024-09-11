import { EventBus } from '../../../Shared/domain/eventBus/EventBus';
import { Course } from '../domain/Course';
import { CourseAlreadyExists } from '../domain/CourseAlreadyExists';
import { CourseRepository } from '../domain/CourseRepository';

export class CourseCreator {
	constructor(private readonly repository: CourseRepository, private readonly eventBus: EventBus) {}

	async run(id: string, name: string, duration: string): Promise<void> {
		await this.ensureCourseDoesNotExist(id);

		const course = Course.create({ id, name, duration });

		await this.repository.save(course);

		return this.eventBus.publish(course.pullDomainEvents());
	}

	private async ensureCourseDoesNotExist(id: string): Promise<void> {
		const course = await this.repository.findById(id);

		if (course) {
			throw new CourseAlreadyExists(id);
		}
	}
}
