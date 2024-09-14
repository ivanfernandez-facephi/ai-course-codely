import { Course } from '../domain/Course';
import { CourseFinderDomainService } from '../domain/CourseFinderDomainService';

export class CourseFinder {
	constructor(private readonly finderDomainService: CourseFinderDomainService) {}

	async run(id: string): Promise<Course> {
		return this.finderDomainService.run(id);
	}
}
