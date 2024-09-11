import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import { Controller } from './Controller';

export class CoursePutController implements Controller {
	constructor(private readonly creator: CourseCreator) {}

	async run(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { name, duration } = req.body as { name: string; duration: string };

		await this.creator.run(id, name, duration);

		res.status(httpStatus.CREATED).send();
	}
}
