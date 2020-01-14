import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { GroupinfoComponent } from './groupinfo/groupinfo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    ChatsComponent,
    ChatComponent,
    GroupComponent,
    GroupinfoComponent,
    LoginComponent,
    SignupComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
