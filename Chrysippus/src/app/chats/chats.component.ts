import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  chats: { id: string, contact: string }[] = [];

  constructor(private router: Router, private http: HttpClient, private variables: VariablesService, private user: UserService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    console.log(this.variables.urlBackend + "/chats/" + this.user.id + "/all");
    this.http.get(this.variables.urlBackend + "/chats/" + this.user.id + "/all").subscribe(
      res => {
        console.log(res);
      }
    );
  }

  goToChat(chat: { id: string, contact: string }) {
    this.router.navigate(["/chat"], { queryParams: { test: "hello" } });
  }

}
