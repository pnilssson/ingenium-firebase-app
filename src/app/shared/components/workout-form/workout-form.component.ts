import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Timestamp } from 'firebase/firestore';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Workout } from '../../models/workout';
import { WorkoutType } from '../../models/workoutType';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  workoutTypes$: Observable<WorkoutType[]> | undefined;
  userId: string | undefined;

  submitted = false;
  workoutForm: FormGroup;

  model!: NgbDateStruct;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public auth: AuthService
  ) {
    this.workoutForm = this.formBuilder.group({
      id: [null],
      time: [null, Validators.required],
      description: [''],
      date: [this.calendar.getToday(), Validators.required],
      type: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getWorkoutTypes();
    this.setUserId();
  }

  getWorkoutTypes() {
    this.workoutTypes$ = this.apiService.getTypes();
  }

  setUserId() {
    this.auth.user$
      .pipe(
        takeUntil(this.destroy$),
        tap((user) => (this.userId = user?.uid))
      )
      .subscribe();
  }

  save() {
    this.submitted = true;
    if (this.workoutForm.valid) {
      this.apiService
        .addWorkout(this.getWorkout())
        .then(() => {
          this.toastService.showToast({
            type: 'success',
            msg: 'Workout added.',
            hide: true,
            timeout: 3000,
          });
          this.onSave.emit();
        })
        .catch(() => {
          this.toastService.showToast({
            type: 'warning',
            msg: 'An error occured when adding the workout.',
            hide: false,
          });
        });
    }
  }

  private getWorkout(): Workout {
    const { time, description, date, type } = this.workoutForm.value;
    const uid = this.userId!;
    return {
      date: {
        year: date.year,
        month: date.month,
        day: date.day,
      },
      type,
      time,
      description,
      uid,
    };
  }

  cancel() {
    this.onCancel.emit();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.workoutForm.controls;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
