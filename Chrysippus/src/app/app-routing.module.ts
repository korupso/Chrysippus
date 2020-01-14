import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { GroupsComponent } from './groups/groups.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { GroupinfoComponent } from './groupinfo/groupinfo.component';

const routes: Routes = [
  { path: "", redirectTo: "chats", pathMatch: "full" },
  { path: "chats", component: ChatsComponent },
  { path: "groups", component: GroupsComponent },
  { path: "chat", component: ChatComponent },
  { path: "group", component: GroupComponent },
  { path: "groupinfo", component: GroupinfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
