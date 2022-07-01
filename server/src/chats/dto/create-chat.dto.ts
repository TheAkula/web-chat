import { User } from 'src/users/user.model';

export class CreateChatDto {
  user: User;
  name: string;
  chatsGroupId: string;
}
