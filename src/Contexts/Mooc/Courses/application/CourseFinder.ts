import { Course } from '../domain/Course';
import { CourseNotFound } from '../domain/CourseNotFound';
import { CourseRepository } from '../domain/CourseRepository';

export class CourseFinder {
	constructor(private readonly repository: CourseRepository) {}

	async run(id: string): Promise<Course> {
		const course = await this.repository.findById(id);

		if (!course) {
			throw new CourseNotFound(id);
		}

		return course;
	}
}
