import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
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
  @Input() workout: Workout | undefined;

  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  workoutTypes: WorkoutType[] = [];
  subTypes: WorkoutType[] = [];
  userId: string | undefined;

  submitted = false;
  workoutForm: FormGroup;

  todaysDate = this.calendar.getToday();

  model!: NgbDateStruct;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public auth: AuthService
  ) {
    this.workoutForm = this.formBuilder.group({
      id: [null],
      time: [null, Validators.required],
      description: [null],
      completed: [true],
      date: [this.todaysDate, Validators.required],
      type: [null, Validators.required],
      subType: [null],
    });
  }

  ngOnInit() {
    this.setUserId();
    this.getWorkoutTypes();
    this.updateForm();
  }

  setUserId() {
    this.auth.user$
      .pipe(
        takeUntil(this.destroy$),
        tap((user) => (this.userId = user?.uid))
      )
      .subscribe();
  }

  getWorkoutTypes() {
    this.apiService
      .getTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.workoutTypes = res;
        this.workoutForm.controls?.['type'].patchValue(
          this.workoutTypes.find(
            (a) => a.name == (this.workout ? this.workout.type.name : 'Other')
          )
        );
        this.getSubTypes();
      });
  }

  getSubTypes() {
    this.apiService
    .getSubTypes(this.f['type'].value.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      this.subTypes = res;
      this.workoutForm.controls?.['subType'].patchValue(
        this.subTypes.find(
          (a) => a.name == (this.workout ? this.workout.subType?.name : null)
        )
      );
    }); 
  }

  onDateSelect(e: any) {
    this.todaysDate.before(e)
      ? this.workoutForm.controls?.['completed'].patchValue(false)
      : this.workoutForm.controls?.['completed'].patchValue(true);
  }

  updateForm() {
    if (this.workout) {
      this.workoutForm.patchValue(this.workout);
    }
  }

  save() {
    this.submitted = true;
    if (this.workoutForm.valid) {
      if (this.workout) {
        this.updateWorkout();
      }
      if (!this.workout) {
        this.addWorkout();
      }
    }
  }

  private updateWorkout() {
    this.apiService
      .updateWorkout(this.userId!, this.workout?.uid!, this.getWorkout())
      .then(() => {
        this.successToast();
      })
      .catch((err: any) => {
        console.log(err);
        this.errorToast();
      });
  }

  private addWorkout() {
    this.apiService
      .addWorkout(this.userId!, this.getWorkout())
      .then(() => {
        this.successToast();
      })
      .catch(() => {
        this.errorToast();
      });
  }

  private getWorkout(): Workout {
    const { time, description, date, type, subType, completed } = this.workoutForm.value;
    return {
      date: {
        year: date.year,
        month: date.month,
        week: this.getWeekNumber(date),
        day: date.day,
      },
      type: type,
      subType: subType,
      time,
      description,
      completed,
      workoutDate: Timestamp.fromDate(this.getDateFromNgbDate(this.workoutForm.value.date)),
      created: Timestamp.now(),
    };
  }

  private getWeekNumber(date: Date): number {
    let currentDate = this.getDateFromNgbDate(date);
    currentDate.setHours(0);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);

    var days = Math.floor(((currentDate as any) - (startDate as any)) /
        (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);

    return weekNumber;
  }

  private getDateFromNgbDate(date: any): Date {
    return new Date(
      this.ngbDateParserFormatter.format(date)
    );
  }

  private successToast() {
    this.toastService.showToast({
      type: 'success',
      msg: `Workout ${this.workout ? 'updated' : 'added'}.`,
      hide: true,
      timeout: 3000,
    });
    this.onSave.emit();
  }

  private errorToast() {
    this.toastService.showToast({
      type: 'warning',
      msg: `An error occured when ${
        this.workout ? 'updating' : 'adding'
      } the workout.`,
      hide: false,
    });
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
