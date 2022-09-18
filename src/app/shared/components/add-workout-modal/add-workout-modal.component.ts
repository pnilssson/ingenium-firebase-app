import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-workout-modal',
  templateUrl: './add-workout-modal.component.html',
  styleUrls: ['./add-workout-modal.component.scss']
})
export class AddWorkoutModalComponent implements OnInit {
  addWorkoutModalReference: any;

  constructor(private modalService: NgbModal) {}
  
  ngOnInit() {
  }

  open(content: any) {
    this.addWorkoutModalReference = this.modalService.open(content, { size: 'lg' });
    this.addWorkoutModalReference.result.then(() => {
      
    }, () => {
      console.log('dismissed')
    });
  }

  close() {
    this.addWorkoutModalReference.close();
  }
}
