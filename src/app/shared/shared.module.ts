import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutSmallComponent } from './components/workout-small/workout-small.component';
import { WorkoutModalComponent } from './components/workout-modal/workout-modal.component';
import { AddWorkoutButtonComponent } from './components/add-workout-button/add-workout-button.component';
import { SelectWorkoutTypeModalComponent } from './components/select-workout-type-modal/select-workout-type-modal.component';

@NgModule({
  declarations: [
    WorkoutFormComponent,
    WorkoutSmallComponent,
    WorkoutModalComponent,
    AddWorkoutButtonComponent,
    SelectWorkoutTypeModalComponent
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
    WorkoutModalComponent,
    AddWorkoutButtonComponent,
    SelectWorkoutTypeModalComponent
  ],
})
export class SharedModule {}
