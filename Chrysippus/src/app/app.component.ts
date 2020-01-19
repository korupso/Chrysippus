import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // HTML related variables
  title: string = 'Chrysippus';
  navbarList: { name: string, link: string, tagName: string }[] = [
    { name: "Chats", link: "/chats", tagName: "chats" },
    { name: "Groups", link: "/groups", tagName: "groups" },
    { name: "Password Reset", link: "/password-reset", tagName: "password-reset" },
    { name: "Logout", link: "/logout", tagName: "logout" }
  ];
  dynamicNavbarList: { name: string, link: string, tagName: string }[] = [];

  // TS related variables
  currentPath: string;
  hasNavbar: Boolean;
  navbarBlacklist: string[] = [
    "login",
    "password-reset",
    "logout"
  ];
  currentNavbarElement: { name: string, link: string, tagName: string } = { name: "Login", link: "/login", tagName: "login" };

  /**
   * This constructor tracks checks if the navbar is needed, every time the url is changed.
   * 
   * @param router Injects the angular router singleton. One can get information about navigation state and can navigate using it.
   * 
   * @author Joel Meccariello
   */
  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      if ((val as any).url) this.currentPath = (val as any).url.slice(1);

      this.hasNavbar = this.checkIfHasNavbar();

      this.dynamicNavbarList = this.correctNavbar();

      this.currentNavbarElement = this.getCurrentNavbarElement();

      if (this.hasNavbar) this.addMainClassToComponentTag();
    })
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

    this.navbarList.forEach((navbarElement: { name: string, link: string, tagName: string }) => {
      if (this.currentPath !== navbarElement.link.slice(1)) tmpDynamicNavbarList.push(navbarElement);
    });

    return tmpDynamicNavbarList;
  }

  /**
   * This method gets the current navbar element, which isn't display, but really needed for later css injection.
   * 
   * @author Joel Meccariello
   */
  getCurrentNavbarElement(): { name: string, link: string, tagName: string } {
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
    if (this.currentNavbarElement) if (document.getElementsByTagName("app-" + this.currentNavbarElement.tagName).length > 0) document.getElementsByTagName("app-" + this.currentNavbarElement.tagName)[0].setAttribute("class", "main");
  }

}
