import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessengerService} from '../../services/MessengerService';
import {Conversation} from '../../models/Conversation';
import {Chat} from '../../models/Chat';
import {ApiService} from '../../services/ApiService';
import {NotificationService} from '../../services/NotificationService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  conversations: any[];
  chosenConversation: Conversation;
  @ViewChild('messageInput', {static: false})
  inputMessage: ElementRef;
  @ViewChild('messagesScroll', {static: false})
  messagesScroll: ElementRef;
  id: number;

  constructor(private cookies: CookieService, private router: Router,
              private messengerService: MessengerService, private api: ApiService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.conversations = new Array<any>();
    this.updateChat();

    this.id = setInterval(() => {
      this.updateChat();
    }, 300);
  }


  updateChat(): void {
    this.messengerService.getConversationHistory().subscribe(
      (data: Conversation[]) => {

        if (data.length < this.conversations.length) {
          data.push(this.conversations[this.conversations.length - 1]);
        }

        this.conversations = data;


        if (this.whereAmIComingFrom() !== '') {
          let conversationExists = false;
          for (const conversation of this.conversations) {
            if (conversation.to === this.whereAmIComingFrom()) {
              conversationExists = true;
              break;
            }
          }

          if (!conversationExists) {
            this.api.getProfilePicture(this.whereAmIComingFrom()).subscribe(
              (data2) => {
                this.conversations.push(new Conversation(this.whereAmIComingFrom(), this.cookies.get('username'), data2.image));
              }
            );
          }

        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }


  openConversation(conversation): void {
    this.router.navigateByUrl('chat/' + this.whoAmITalkingTo(conversation));
    this.notificationService.seeNotification(conversation);
  }

  whereAmIComingFrom(): string {
    const route = this.router.url;
    return route.substr(6);
  }

  getCssForAConversation(conversation): string {
    if (this.whoAmITalkingTo(conversation) === (this.whereAmIComingFrom())) {
      this.chosenConversation = conversation;
      return 'clicked-conversation-user';
    }
    return 'conversation-user';
  }

  whoAmITalkingTo(conversation): string {
    return (conversation.to === this.cookies.get('username')) ? conversation.from : conversation.to;
  }

  translateImage(image: any): any {
    return 'data:image/jpeg;base64,' + image;
  }

  submitMessage(): void {
    const newChat = new Chat();
    newChat.message = this.inputMessage.nativeElement.value;
    if(newChat.message === '')
      return;
    newChat.sender = this.chosenConversation.from;
    newChat.receiver = this.chosenConversation.to;
    newChat.timestamp = Date.now();
    this.messengerService.addMessage(newChat);
    this.chosenConversation.chat.push(newChat);
    this.inputMessage.nativeElement.value = '';
    this.scrollAtBottom();
  }

  getLastChat(conversation): Chat {
    return conversation.chat[conversation.chat.length - 1];
  }

  whoSentLastMessage(conversation): string {
    return (conversation.from === this.getLastChat(conversation).sender) ? 'You:' : '';
  }

  getShortLastMessage(conversation): string {
    const message = this.getLastChat(conversation).message;
    return (message.length > 18) ? message.substring(0, 18) + '...' : message;
  }

  scrollAtBottom(): void {
    this.messagesScroll.nativeElement.scrollTop = this.messagesScroll.nativeElement.scrollHeight;

  }

  getTimestamp(conversation): string{
    const date = this.getLastChat(conversation).timestamp;
    const nowDate = new Date();
    // console.log('Conversation: ' + new Date(date).getFullYear() + 'Now: ' + new Date().getFullYear());

    if ((new Date(date).getFullYear() === nowDate.getFullYear()) && (new Date(date).getMonth() === nowDate.getMonth())
      && (new Date(date).getDate() === nowDate.getDate())){
      return new Date(date).getHours() + ':' + new Date(date).getMinutes();
    }
    else if ((new Date(date).getFullYear() === nowDate.getFullYear()) && (new Date(date).getMonth() === nowDate.getMonth())){
      return this.numberToWeekDay(new Date(date).getDay());
    }
    else {
      return (new Date(date).getDate() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear());
    }
  }

  numberToWeekDay(numberOfTheDay): string{
    if (numberOfTheDay === 1) {
      return 'Monday';
    }
    else if (numberOfTheDay === 2) {
      return 'Tuesday';
    }
    else if (numberOfTheDay === 3) {
      return 'Wednesday';
    }
    else if (numberOfTheDay === 4) {
      return 'Thursday';
    }
    else if (numberOfTheDay === 5) {
      return 'Friday';
    }
    else if (numberOfTheDay === 6) {
      return 'Saturday';
    }
    else {
      return 'Sunday';
    }
  }
}
