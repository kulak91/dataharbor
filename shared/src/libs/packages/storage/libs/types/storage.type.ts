type Storage = {
  set(key: string, value: unknown): Promise<void>;
  get<R>(key: string): Promise<R | null>;
  delete(key: string): Promise<void>;
  has(key: string): Promise<boolean>;
};

export { type Storage };
