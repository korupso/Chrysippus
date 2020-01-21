import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentChatService } from './services/chat/current-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // HTML related variables
  title: string = 'Chrysippus';
  navbarList: { name: string, link: string, sublinks?: string[] }[] = [
    { name: "Chats", link: "/chats", sublinks: ["/chat"] },
    { name: "Groups", link: "/groups", sublinks: ["/group", "/group/:name/info"] },
    { name: "Password Reset", link: "/password-reset" },
    { name: "Logout", link: "/logout" }
  ];
  dynamicNavbarList: { name: string, link: string, sublinks?: string[] }[] = [];
  navbarTitle: string;

  // TS related variables
  currentPath: string;
  hasNavbar: Boolean;
  navbarBlacklist: string[] = [
    "login",
    "logout"
  ];
  currentNavbarElement: { name: string, link: string, sublinks?: string[] } = { name: "Login", link: "/login" };
  chatName: string;
  clickableNavbar: Boolean;
  navbarLink: string;

  /**
   * This constructor tracks checks if the navbar is needed, every time the url is changed.
   * 
   * @param router Injects the angular router singleton. One can get information about navigation state and can navigate using it.
   * 
   * @author Joel Meccariello
   */
  constructor(private router: Router, private chatService: CurrentChatService) {
    this.router.events.subscribe(val => {
      if ((val as any).url || (val as any).routerEvent) {
        if ((val as any).url) this.currentPath = (val as any).url.slice(1);
        else if ((val as any).routerEvent) this.currentPath = (val as any).routerEvent.url.split("/")[1];

        this.hasNavbar = this.checkIfHasNavbar();

        this.dynamicNavbarList = this.correctNavbar();

        this.currentNavbarElement = this.getCurrentNavbarElement();

        if (this.hasNavbar) {
          this.addMainClassToComponentTag();

          this.navbarTitle = this.getNavbarTitle(val as any).replace("%20", " ");

          this.clickableNavbar = this.checkIfNavbarIsClickable(val as any);

          this.navbarLink = this.getNavbarLink(val as any);
        }
      }
    });
  }

  /**
   * This method checks if the path of the current page is in the blacklist and doesn't need a navbar.
   * 
   * @author Joel Meccariello
   */
  checkIfHasNavbar(): Boolean {
    var tmp = true;

    this.navbarBlacklist.forEach((path: string) => {
      if (this.currentPath === path) tmp = false;
    })

    return tmp;
  }

  /**
   * This method makes the navbar dynamic. The navbar will not display the current page, if this method gets activated.
   * 
   * @author Joel Meccariello
   */
  correctNavbar() {
    var tmpDynamicNavbarList = [];

    for (var navbarElement of this.navbarList) if (this.currentPath !== navbarElement.link.slice(1)) tmpDynamicNavbarList.push(navbarElement);

    return tmpDynamicNavbarList;
  }

  /**
   * This method gets the current navbar element, which isn't display, but really needed for later css injection.
   * 
   * @author Joel Meccariello
   */
  getCurrentNavbarElement(): { name: string, link: string, sublinks?: string[] } {
    var tmp = this.navbarList.filter(navbarElement => this.dynamicNavbarList.indexOf(navbarElement) < 0)[0];
    if (!tmp) return this.currentNavbarElement;
    return tmp;
  }

  /**
   * This method gets the current navbar element and fetches the html tag associated with the current navbar element property called "tagName". It only adds the main css class, but this method alone makes the navbar possible.
   * 
   * @author Joel Meccariello
   */
  addMainClassToComponentTag() {
    if (this.currentNavbarElement) if (document.getElementsByTagName("app-" + this.currentNavbarElement.link.slice(1)).length > 0) document.getElementsByTagName("app-" + this.currentNavbarElement.link.slice(1))[0].setAttribute("class", "main");
    else if (this.currentNavbarElement.sublinks) for (var sublink of this.currentNavbarElement.sublinks) if (sublink.includes(":name")) {
      if (document.getElementsByTagName("app-groupinfo").length > 0) document.getElementsByTagName("app-groupinfo")[0].setAttribute("class", "main");
    } else if (document.getElementsByTagName("app-" + sublink.slice(1)).length > 0) document.getElementsByTagName("app-" + sublink.slice(1))[0].setAttribute("class", "main");
  }

  /**
   * This method gets the current navbar title.
   * 
   * @param val Can contain either a routerEvent or a url.
   * 
   * @author Joel Meccariello
   */
  getNavbarTitle(val: any): string {
    return val.routerEvent ? (val.routerEvent.url.split("/").length === 3 ? val.routerEvent.url.split("/")[2] : this.navbarTitle) : this.currentNavbarElement.name;
  }

  checkIfNavbarIsClickable(val: any) {
    if (val.routerEvent) if (val.routerEvent.url.split("/").length === 3) return val.routerEvent.url.split("/")[1] === "group";
  }

  getNavbarLink(val: any): string {
    if (val.routerEvent) if (val.routerEvent.url.split("/").length === 3) if (val.routerEvent.url.split("/")[1] === "group") return "/group/" + this.navbarTitle + "/info";
  }

}
