import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobrequestlistComponent } from './jobrequestlist/jobrequestlist.component';
import { JobrequestComponent } from './jobrequest/jobrequestcomponent';
import { JobrequestdetailComponent } from './jobrequestdetail/jobrequestdetail.component';


const routes: Routes = [
  { path: '', component: JobrequestlistComponent},
  { path: 'request', component: JobrequestComponent },
  { path: 'request/:id', component: JobrequestdetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobrequestRoutingModule { }
