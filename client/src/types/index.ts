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
