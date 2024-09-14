import { Nullable } from '../../../Shared/domain/Nullable';
import { MySqlRepository } from '../../../Shared/infrastructure/persistence/MySqlRepository';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class MySqlCourseRepository extends MySqlRepository<Course> implements CourseRepository {
	readonly TABLE_NAME = 'courses';

	async persist(course: Course): Promise<void> {
		return this.saveOrUpdate(course);
	}

	async findById(id: string): Promise<Nullable<Course>> {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		return this.searchById(id, Course.fromPrimitives);
	}

	protected async initialize(): Promise<void> {
		const query = `
			CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
				id VARCHAR(36) PRIMARY KEY,
				name VARCHAR(100) NOT NULL UNIQUE,
				duration VARCHAR(100) NOT NULL,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
		`;

		await this.conn.query(query);
	}
}
