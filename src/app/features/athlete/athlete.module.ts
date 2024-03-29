import { NgModule } from '@angular/core';

import { AthleteRoutingModule } from './athlete-routing.module';
import { AthleteComponent } from './athlete.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { BenchmarksComponent } from './benchmarks/benchmarks.component';


@NgModule({
  declarations: [
    AthleteComponent,
    DashboardComponent,
    CalendarComponent,
    BenchmarksComponent
  ],
  imports: [
    SharedModule,
    AthleteRoutingModule
  ]
})
export class AthleteModule { }
