import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SelectWorkoutTypeModalComponent } from '../select-workout-type-modal/select-workout-type-modal.component';

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
    const modalRef = this.modalService.open(SelectWorkoutTypeModalComponent, {
      size: 'lg',
    });
  }
}
