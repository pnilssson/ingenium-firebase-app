import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Workout } from 'src/app/shared/models/workout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  latestWorkouts: Workout[] = [];

  userId: string | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public auth: AuthService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.setUserId();
  }
  
  setUserId() {
    this.auth.user$
      .pipe(
        takeUntil(this.destroy$),
        tap((user) => (this.userId = user?.uid))
      )
      .subscribe(() => {
        this.getLatestWorkouts();
      });
  }

  getLatestWorkouts() {
    this.apiService
      .getWorkoutsWithLimit(this.userId!, 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.latestWorkouts = res;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
