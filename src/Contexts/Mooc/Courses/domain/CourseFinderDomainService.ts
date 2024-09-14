import { Course } from './Course';
import { CourseNotFound } from './CourseNotFound';
import { CourseRepository } from './CourseRepository';

export class CourseFinderDomainService {
	constructor(private readonly repository: CourseRepository) {}

	async run(id: string): Promise<Course> {
		const course = await this.repository.findById(id);

		if (!course) {
			throw new CourseNotFound(id);
		}

		return course;
	}
}
