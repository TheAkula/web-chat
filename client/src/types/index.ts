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
