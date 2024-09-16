import { Nullable } from '../../../Shared/domain/Nullable';
import { User } from './User';
import { UserId } from './UserId';

export interface UserRepository {
	persist(user: User): Promise<void>;

	findById(id: UserId): Promise<Nullable<User>>;
}
