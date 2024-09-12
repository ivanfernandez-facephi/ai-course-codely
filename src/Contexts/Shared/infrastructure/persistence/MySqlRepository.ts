import mysql, { Pool } from 'mysql2/promise';

import { AggregateRoot } from '../../domain/AggregateRoot';
import { Nullable } from '../../domain/Nullable';

export abstract class MySqlRepository<T extends AggregateRoot> {
	private static pool: Pool | null = null;

	protected readonly conn: Pool;

	abstract readonly TABLE_NAME: string;

	protected constructor() {
		if (!MySqlRepository.pool) {
			MySqlRepository.pool = mysql.createPool({
				host: 'localhost',
				user: 'admin',
				password: 'admin',
				database: 'ai-course-codely',
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			});
		}
		this.conn = MySqlRepository.pool;
	}

	protected abstract initialize(): Promise<void>;

	protected async saveOrUpdate(entity: T): Promise<void> {
		await this.initialize();

		const fields = Object.keys(entity.toPrimitives()).join(', ');
		const values = Object.values(entity.toPrimitives()).map(value =>
			typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)
		);

		const placeholders = values.map(() => '?').join(', ');

		const updateFields = Object.keys(entity.toPrimitives())
			.map(field => `${field} = VALUES(${field})`)
			.join(', ');

		const query = `
            INSERT INTO ${this.TABLE_NAME} (${fields})
            VALUES (${placeholders})
            ON DUPLICATE KEY UPDATE ${updateFields}
        `;

		await this.conn.query(query, values);
	}

	protected async searchById(
		id: string,
		fromPrimitives: (plainData: any) => T
	): Promise<Nullable<T>> {
		await this.initialize();

		const query = `SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`;

		const [rows] = await this.conn.query(query, [id]);

		if (Array.isArray(rows) && rows.length > 0) {
			return fromPrimitives(rows[0]);
		}

		return null;
	}
}
