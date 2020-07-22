import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../login/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      debugger;
      let url = next.url[0].path;
      if (this.authorizationService.isUserLoggedIn()) {
  
        if (url == "agent" && this.authorizationService.user.role == "agent")
          return true;
        else
          this.router.navigate(['/login']);
      }
      else {
        this.router.navigate(['/login']);
      }
  }
  
}
