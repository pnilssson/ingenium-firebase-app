import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddWorkoutModalComponent } from './components/add-workout-modal/add-workout-modal.component';
import { AddWorkoutFormComponent } from './components/add-workout-form/add-workout-form.component';

@NgModule({
  declarations: [AddWorkoutModalComponent, AddWorkoutFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AddWorkoutModalComponent
  ]
})
export class SharedModule { }
