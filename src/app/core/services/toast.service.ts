import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from 'src/app/shared/models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  constructor() {}
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showToast(toast: Toast) {
    this.show(toast.msg, {
      classname: this.getClass(toast),
      delay: toast.timeout,
      hide: toast.hide ?? false,
    });
  }

  private getClass(toast: Toast): string {
    switch (toast.type) {
      case 'success':
        return 'bg-success text-light';
      case 'warning':
        return 'bg-warning text-dark';
      case 'danger':
        return 'bg-danger text-light';
      default:
        return 'bg-light text-dark';
    }
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
