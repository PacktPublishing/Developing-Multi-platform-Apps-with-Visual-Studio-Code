import { Component } from '@angular/core';
import { AuthorizationService } from './login/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JobOrderSystem';

  constructor(public authorizationService: AuthorizationService, private router: Router){

  }

  logOut(){
    debugger;
    this.authorizationService.logout();
    this.router.navigate(['/home']);
  }


}
