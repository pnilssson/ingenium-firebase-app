import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-workout-form',
  templateUrl: './add-workout-form.component.html',
  styleUrls: ['./add-workout-form.component.scss']
})
export class AddWorkoutFormComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  
  constructor(private toastService: ToastService) { }

  ngOnInit() {
  }

  save() {
    this.toastService.showToast({
      type: 'success',
      msg: 'Workout added.',
      hide: true,
      timeout: 3000,
    });
    this.onSave.emit();
  }
}
