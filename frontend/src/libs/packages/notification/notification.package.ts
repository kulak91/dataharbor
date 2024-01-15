import toast from 'react-hot-toast';

import type { NotificationService } from './libs/interfaces/interfaces';

class Notification implements NotificationService {
  public success(message: string): void {
    toast.success(message);
  }
  public error(message: string): void {
    toast.error(message);
  }
}

export { Notification };
