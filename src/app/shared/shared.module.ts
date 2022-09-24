import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutSmallComponent } from './components/workout-small/workout-small.component';
import { WorkoutModalComponent } from './components/workout-modal/workout-modal.component';

@NgModule({
  declarations: [
    WorkoutFormComponent,
    WorkoutSmallComponent,
    WorkoutModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    WorkoutFormComponent,
    WorkoutSmallComponent,
    WorkoutModalComponent
  ],
})
export class SharedModule {}
