import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDumbbell, faHeart, faPersonRunning, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout-small',
  templateUrl: './workout-small.component.html',
  styleUrls: ['./workout-small.component.scss'],
})
export class WorkoutSmallComponent implements OnInit {
  @Input() workout: Workout | undefined;
  @Input() showDescription: boolean = false;

  icon: IconProp | undefined;
  constructor() {}

  ngOnInit() {
    this.setIcon();
  }

  setIcon() {
    switch (this.workout?.type.name) {
      case 'Strength':
        this.icon = faDumbbell;
        break;
      case 'Conditioning':
        this.icon = faPersonRunning;
        break;
      case 'Sport':
        this.icon = faStopwatch;
        break;
      default:
        this.icon = faHeart;
    }
  }
}
