import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobrequestGuard } from './jobrequest/jobrequest.guard';
import { AgentGuard } from './agent/agent.guard';


const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path: '', redirectTo:'home', pathMatch:'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module=>module.LoginModule)
  },
  {
    path: 'jobrequest',
    loadChildren:() => import('./jobrequest/jobrequest.module').then(module=>module.JobrequestModule),
    canActivate:[JobrequestGuard]

  },
  {
    path: 'agent',
    loadChildren:() => import('./agent/agent.module').then(module=>module.AgentModule),
    canActivate: [AgentGuard]
  }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
