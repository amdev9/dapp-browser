export type Message = {
  from?: string;
  message: string;
  own: boolean;
};

export type MessageEntity = {
  id: string;
  message: Message;
};
