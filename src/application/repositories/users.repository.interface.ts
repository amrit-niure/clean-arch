import {NewUser,User} from '@/db/drizzle/schema/users'

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(input: NewUser): Promise<User>;
}
