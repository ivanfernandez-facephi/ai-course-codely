import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserRegister } from '../../../../Contexts/Mooc/Users/application/UserRegister';
import { Controller } from './Controller';

export class UserPutController implements Controller {
	constructor(private readonly register: UserRegister) {}

	async run(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { name, email } = req.body as { name: string; email: string };

		await this.register.run(id, name, email);

		res.status(httpStatus.CREATED).send();
	}
}
