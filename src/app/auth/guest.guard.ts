import { inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

export const canActivateSignup = (): boolean | UrlTree => {
    const isLoggedIn = inject(AuthService).isAuth;

    if (isLoggedIn) {
        return inject(Router).createUrlTree(["/account"]);
    }

    return true;
}
