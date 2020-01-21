import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';
import { CurrentChatService } from '../services/chat/current-chat.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  myGroups = [];
  favGroups = [];
  groupsImIn = [];

  constructor(private router: Router, private http: HttpClient, private variables: VariablesService, private user: UserService, private chatService: CurrentChatService) { }

  ngOnInit() {
    this.getAllGroups();
  }

  getAllGroups() {
    this.http.get(this.variables.urlBackend + "/groups/" + this.user.id + "/all").subscribe(
      res => {
        this.myGroups = (res as any).myGroups;
        this.favGroups = (res as any).favGroups;
        this.groupsImIn = (res as any).groupsImIn;
      }
    );
  }

  goToChat(chat: any) {
    this.chatService.currentChat = chat;
    this.router.navigate(["/group/" + chat.name]);
  }

}
