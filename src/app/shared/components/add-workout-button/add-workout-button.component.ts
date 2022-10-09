import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutModalComponent } from '../workout-modal/workout-modal.component';

@Component({
  selector: 'app-add-workout-button',
  templateUrl: './add-workout-button.component.html',
  styleUrls: ['./add-workout-button.component.scss']
})
export class AddWorkoutButtonComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal() {
    const modalRef = this.modalService.open(WorkoutModalComponent, {
      size: 'lg',
    });
  }
}
