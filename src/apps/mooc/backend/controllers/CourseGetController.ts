import { Request, Response } from 'express';

import { CourseFinder } from '../../../../Contexts/Mooc/Courses/application/CourseFinder';
import { Controller } from './Controller';

export class CourseGetController implements Controller {
	constructor(private readonly finder: CourseFinder) {}

	async run(req: Request, res: Response): Promise<void> {
		const id = req.params.id;

		const course = await this.finder.run(id);

		res.json(course.toPrimitives());
	}
}
