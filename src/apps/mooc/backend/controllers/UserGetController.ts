import { Request, Response } from 'express';

import { UserFinder } from '../../../../Contexts/Mooc/Users/application/UserFinder';
import { Controller } from './Controller';

export class UserGetController implements Controller {
	constructor(private readonly finder: UserFinder) {}

	async run(req: Request, res: Response): Promise<void> {
		const id = req.params.id;

		const user = await this.finder.run(id);

		res.json(user.toPrimitives());
	}
}
