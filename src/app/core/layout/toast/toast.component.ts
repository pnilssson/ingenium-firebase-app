import { Component, OnInit, TemplateRef } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: {
    class: 'toast-container position-fixed bottom-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastComponent implements OnInit {
  faXmark = faXmark;
  constructor(public toastService: ToastService) {}

  ngOnInit() {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
