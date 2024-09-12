import { Nullable } from '../../../Shared/domain/Nullable';
import { User } from './User';

export interface UserRepository {
	persist(user: User): Promise<void>;

	findById(id: string): Promise<Nullable<User>>;
}
