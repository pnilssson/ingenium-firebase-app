import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout-modal',
  templateUrl: './workout-modal.component.html',
  styleUrls: ['./workout-modal.component.scss'],
})
export class WorkoutModalComponent implements OnInit {
  @Input() workout: Workout | undefined;
  @Input() edit: boolean = false;

  faPen = faPen;
  addWorkoutModalReference: any;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open(content: any) {
    this.addWorkoutModalReference = this.modalService.open(content, {
      size: 'lg',
    });
    this.addWorkoutModalReference.result.then(
      () => {},
      () => {}
    );
  }

  close() {
    this.addWorkoutModalReference.close();
  }
}
