import {Chat} from './Chat';

export class Conversation {
  chat: Chat[];
  to: string;
  from: string;
  icon: any;


  constructor(to, from, icon) {
    this.chat = [];
    this.to = to;
    this.from = from;
    this.icon = icon;
  }
}
