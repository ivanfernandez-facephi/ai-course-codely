import { Nullable } from '../../../Shared/domain/Nullable';
import { Course } from './Course';

export interface CourseRepository {
	persist(course: Course): Promise<void>;

	findById(id: string): Promise<Nullable<Course>>;
}
