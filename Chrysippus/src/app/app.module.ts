import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { TokenInterceptorService } from './services/http/token-interceptor.service';

/**
 * This class is empty, but the decorator manages all the declarations, imports, providers and the bootstrap.
 * 
 * @author Joel Meccariello
 */
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
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
