import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {ApiService} from "./ApiService";

@Injectable({
  providedIn: 'root'
})
export class MessengerService{
  private BASE_URL = 'http://localhost:8080';
  private GET_CONVERSATION_HISTORY = `${this.BASE_URL}/messenger/getConversationHistory`;
  private ADD_NEW_MESSAGE = `${this.BASE_URL}/messenger/addMessage`;

  constructor(private http: HttpClient, private cookies: CookieService, private api: ApiService) {

  }

  getConversationHistory(): Observable<any> {
    const body = {};
    return this.http.post(this.GET_CONVERSATION_HISTORY, body, {headers: this.api.generateAuthorizeBearerJWT()});
  }

  addMessage(chat):void {
    console.log(chat);
    this.http.post(this.ADD_NEW_MESSAGE, chat, {headers: this.api.generateAuthorizeBearerJWT()}).subscribe();
  }



}
