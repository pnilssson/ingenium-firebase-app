import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faDumbbell, faHeart, faPersonRunning, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutModalComponent } from '../workout-modal/workout-modal.component';

export interface WorkoutTypeChoice {
  name: 'Strength' | 'Conditioning' | 'Sport' | null,
}
@Component({
  selector: 'app-select-workout-type-modal',
  templateUrl: './select-workout-type-modal.component.html',
  styleUrls: ['./select-workout-type-modal.component.scss']
})
export class SelectWorkoutTypeModalComponent implements OnInit {
  faDumbbell = faDumbbell;
  faPersonRunning = faPersonRunning;
  faStopwatch = faStopwatch;
  faHeart = faHeart;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  openModal(workoutType: 'Strength' | 'Conditioning' | 'Sport' | null = null) {
    const modalRef = this.modalService.open(WorkoutModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.workoutType = workoutType;
    this.close();
  }

  close() {
    this.activeModal.close();
  }
}
