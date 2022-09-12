import { NgModule } from '@angular/core';

import { AthleteRoutingModule } from './athlete-routing.module';
import { AthleteComponent } from './athlete.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AthleteComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    AthleteRoutingModule
  ]
})
export class AthleteModule { }
