import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteComponent } from './athlete.component';
import { BenchmarksComponent } from './benchmarks/benchmarks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    title: 'Ingenium | Dashboard',
    component: AthleteComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', title: 'Ingenium | Calendar', component: CalendarComponent },
      { path: 'benchmarks', title: 'Ingenium | Dashboard', component: BenchmarksComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AthleteRoutingModule {}
