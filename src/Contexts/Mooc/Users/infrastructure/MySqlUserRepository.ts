import { Nullable } from '../../../Shared/domain/Nullable';
import { MySqlRepository } from '../../../Shared/infrastructure/persistence/MySqlRepository';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class MySqlUserRepository extends MySqlRepository<User> implements UserRepository {
	readonly TABLE_NAME = 'users';

	async persist(user: User): Promise<void> {
		return this.saveOrUpdate(user);
	}

	async findById(id: string): Promise<Nullable<User>> {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		return this.searchById(id, User.fromPrimitives);
	}

	async initialize(): Promise<void> {
		const query = `
			CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
				id VARCHAR(36) PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				email VARCHAR(100) NOT NULL,
				suggestedCourses JSON,
				finishedCourses JSON,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
		`;

		await this.conn.query(query);
	}
}
