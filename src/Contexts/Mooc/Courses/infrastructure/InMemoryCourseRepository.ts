import { Nullable } from '../../../Shared/domain/Nullable';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class InMemoryCourseRepository implements CourseRepository {
	private readonly data: Course[] = [];

	async findById(id: string): Promise<Nullable<Course>> {
		return Promise.resolve(this.data.find(c => c.id === id) ?? null);
	}

	async save(course: Course): Promise<void> {
		this.data.push(course);

		return Promise.resolve();
	}
}
