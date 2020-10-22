import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOutletComponent } from './dashboard-outlet/dashboard-outlet.component';
import { ProfileComponent } from './profile/profile.component';

const routes:Routes = [
  { 
    path: '',
    component: DashboardOutletComponent,
    children: [
      { path: 'profile', component: ProfileComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
