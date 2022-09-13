export interface Toast {
  type: 'success' | 'warning' | 'danger' | 'info';
  msg: string;
  hide?: boolean;
  timeout?: number;
}