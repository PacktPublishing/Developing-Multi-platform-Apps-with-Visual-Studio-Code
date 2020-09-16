import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentlistComponent } from './agentlist/agentlist.component';
import { AgentJobprocessComponent } from './agent-jobprocess/agent-jobprocess.component';


const routes: Routes = [
  { path:'', component: AgentlistComponent},
  { path:'request/:id', component: AgentJobprocessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
