import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';
import { CurrentChatService } from '../services/chat/current-chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  favChats = [];
  otherChats = [];

  constructor(private router: Router, private http: HttpClient, private variables: VariablesService, private user: UserService, private chatService: CurrentChatService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.http.get(this.variables.urlBackend + "/chats/" + this.user.id + "/all").subscribe(
      res => {
        this.favChats = (res as any).favChats;
        this.otherChats = (res as any).otherChats;

        for (var chat of this.otherChats) console.log(chat.contact);
      }
    );
  }

  goToChat(chat: any) {
    console.log(chat.chat.id);
    this.chatService.currentChat = chat.chat;
    this.router.navigate(["/chat/" + chat.contact]);
  }

}
