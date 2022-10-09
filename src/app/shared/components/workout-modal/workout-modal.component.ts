import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout-modal',
  templateUrl: './workout-modal.component.html',
  styleUrls: ['./workout-modal.component.scss'],
})
export class WorkoutModalComponent implements OnInit {
  @Input() workout: Workout | undefined;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }
}
