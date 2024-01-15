interface NotificationService {
  success: (m: string) => void;
  error: (m: string) => void;
}

export { type NotificationService };
