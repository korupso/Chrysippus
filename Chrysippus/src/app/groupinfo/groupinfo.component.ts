import { Component, OnInit } from '@angular/core';
import { CurrentChatService } from '../services/chat/current-chat.service';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.component.html',
  styleUrls: ['./groupinfo.component.scss']
})
export class GroupinfoComponent implements OnInit {

  newUser: string;
  chat: any;
  id: string;
  username: string;

  constructor(private chatService: CurrentChatService, private http: HttpClient, private variables: VariablesService, private user: UserService) { }

  ngOnInit() {
    this.newUser = "";
    this.id = this.user.id;
    this.username = this.user.username;
    this.http.get(this.variables.urlBackend + "/groups/" + this.chatService.currentChat.id).subscribe(
      res => {
        this.chat = res as any;
      }
    );
  }

  addUser() {
    this.http.put(this.variables.urlBackend + "/groups/" + this.chat.id + "/members", { username: this.newUser }).subscribe(res => this.ngOnInit());
  }

  removeUser(member) {
    this.http.put(this.variables.urlBackend + "/groups/" + this.chat.id + "/members/remove", { id: member.id }).subscribe(res => this.ngOnInit());
  }

}
