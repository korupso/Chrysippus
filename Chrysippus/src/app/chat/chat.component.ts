import { Component, OnInit } from '@angular/core';
import { CurrentChatService } from '../services/chat/current-chat.service';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chat: any;
  username: string;
  message: string;

  constructor(private chatService: CurrentChatService, private http: HttpClient, private variables: VariablesService, private user: UserService) { }

  ngOnInit() {
    this.chat = this.chatService.currentChat;
    this.username = this.user.username;
    this.http.get(this.variables.urlBackend + "/chats/" + this.chat.id + "/messages").subscribe(
      res => {
        this.chat.chat = (res as any);
      }
    );
  }

  sendMessage() {
    this.http.put(this.variables.urlBackend + "/chats/" + this.chat.id + "/chat", { author: this.user.id, content: this.message }).subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

}
