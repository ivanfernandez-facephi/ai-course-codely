import { CoursePrimitives } from './Course';

export abstract class CourseGeneratorDomainService {
	protected abstract generate(baseCourses: string[]): Promise<CoursePrimitives[]>;

	async run(baseCourses: string[]): Promise<CoursePrimitives[]> {
		return this.generate(baseCourses);
	}
}
