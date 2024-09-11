import { Nullable } from '../../../Shared/domain/Nullable';
import { Course } from './Course';

export interface CourseRepository {
	findById(id: string): Promise<Nullable<Course>>;

	save(course: Course): Promise<void>;
}
