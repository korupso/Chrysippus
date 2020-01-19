import { CanActivate, Router } from "@angular/router";
import { UserService } from '../services/user/user.service';

export class SecurityGuard implements CanActivate {

    /**
     * This constructor does effectively nothing, but inject services.
     * 
     * @param user      Injects the singleton, in which user data is stored.
     * @param router    Injects the router, with which the user can be redirected.
     * 
     * @author Joel Meccariello
     */
    constructor(private user: UserService, private router: Router) { }

    /**
     * This method checks whether the user is allowed to access the dashboard or not.
     * 
     * @returns Returns true, if the user is allowed to access the dashboard or false if not.
     * 
     * @author Joel Meccariello
     */
    canActivate(): boolean {
        if (this.user.id && this.user.jwt && this.user.username) return true;
        this.router.navigate(["/login"]);
        return false;
    }

}