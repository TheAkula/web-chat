import { SignUpMutation } from "../generated/graphql";

export interface Contact {
  imageUrl: string;
  title: string;
  notReadMessagesAmount: number;
  prevMessage: {
    content: string;
    isRead: boolean;
  };
  id: string;
}

export interface Message {
  content: string;
  authorId: string;
  authorName: string;
  authorImageUrl: string;
  date: Date;
  id: string;
}

export type AuthContextType = Omit<SignUpMutation["signUp"], "__typename">;
