import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserCourseFinisher } from '../../../../Contexts/Mooc/Users/application/UserCourseFinisher';
import { Controller } from './Controller';

export class UserPostFinishCourseController implements Controller {
	constructor(private readonly finisher: UserCourseFinisher) {}

	async run(req: Request, res: Response): Promise<void> {
		const { id, courseId } = req.params;

		await this.finisher.run({ id, courseId });

		res.status(httpStatus.OK).send();
	}
}
