import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDumbbell, faHeart, faPersonRunning, faStopwatch, faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Workout } from '../../models/workout';
import { WorkoutModalComponent } from '../workout-modal/workout-modal.component';

@Component({
  selector: 'app-workout-small',
  templateUrl: './workout-small.component.html',
  styleUrls: ['./workout-small.component.scss'],
})
export class WorkoutSmallComponent implements OnInit {
  @Input() workout: Workout | undefined;
  @Input() showDescription: boolean = false;

  icon: IconProp | undefined;
  background = 'other';
  iconColor = 'other-icon';
  faPen = faPen;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.setIcon();
  }

  openModal() {
    const modalRef = this.modalService.open(WorkoutModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.workout = this.workout;
    modalRef.componentInstance.workoutType = this.workout?.type.name;
  }

  setIcon() {
    switch (this.workout?.type.name) {
      case 'Strength':
        this.icon = faDumbbell;
        this.background = 'strength';
        this.iconColor = 'strength-icon';
        break;
      case 'Conditioning':
        this.icon = faPersonRunning;
        this.background = 'conditioning';
        this.iconColor = 'conditioning-icon';
        break;
      case 'Sport':
        this.icon = faStopwatch;
        this.background = 'sport';
        this.iconColor = 'sport-icon';
        break;
      default:
        this.icon = faHeart;
    }
  }
}
