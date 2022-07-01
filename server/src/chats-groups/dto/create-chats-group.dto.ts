import { User } from 'src/users/user.model';

export class CreateChatsGroupDto {
  user: User;
  name: string;
  imgUrl?: string;
}
