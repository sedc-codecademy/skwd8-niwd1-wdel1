import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOutletComponent } from './dashboard-outlet/dashboard-outlet.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RolesManagementComponent } from './roles-management/roles-management.component';



@NgModule({
  declarations: [DashboardOutletComponent, ProfileComponent, RolesManagementComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
