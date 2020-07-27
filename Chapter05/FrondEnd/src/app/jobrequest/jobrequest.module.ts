import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobrequestRoutingModule } from './jobrequest-routing.module';
import { JobrequestlistComponent } from './jobrequestlist/jobrequestlist.component';
import { JobrequestComponent } from './jobrequest/jobrequestcomponent';
import { FormsModule } from '@angular/forms';
import { JobrequestdetailComponent } from './jobrequestdetail/jobrequestdetail.component';


@NgModule({
  declarations: [JobrequestlistComponent, JobrequestComponent, JobrequestdetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    JobrequestRoutingModule
  ]
})
export class JobrequestModule { }
