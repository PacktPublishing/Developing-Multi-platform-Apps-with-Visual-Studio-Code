import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentlistComponent } from './agentlist/agentlist.component';

import { AgentJobprocessComponent } from './agent-jobprocess/agent-jobprocess.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AgentlistComponent,  AgentJobprocessComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgentRoutingModule
  ]
})
export class AgentModule { }
