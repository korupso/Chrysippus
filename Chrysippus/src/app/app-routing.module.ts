import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { GroupsComponent } from './groups/groups.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { GroupinfoComponent } from './groupinfo/groupinfo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SecurityGuard } from './guards/security.guard';
import { LogoutComponent } from './logout/logout.component';

/**
 * This variable stores all the routing information of the application. None of the pages would be accessible without it.
 * 
 * @author Joel Meccariello
 */
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "logout", component: LogoutComponent },
  { path: "password-reset", component: PasswordResetComponent, canActivate: [SecurityGuard] },
  { path: "chats", component: ChatsComponent, canActivate: [SecurityGuard] },
  { path: "groups", component: GroupsComponent, canActivate: [SecurityGuard] },
  { path: "chat/:contact", component: ChatComponent, canActivate: [SecurityGuard] },
  { path: "group/:name", component: GroupComponent, canActivate: [SecurityGuard] },
  { path: "group/:name/info", component: GroupinfoComponent, canActivate: [SecurityGuard] },
];

/**
 * This class does nothing, but the decorator manages the importation and exportation of the router module.
 * 
 * @author Joel Meccariello
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
