import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { GroupinfoComponent } from './groupinfo/groupinfo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { VariablesService } from './services/variables/variables.service';
import { UserService } from './services/user/user.service';

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
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    VariablesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
