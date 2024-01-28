type SessionCreateResponseDTO = {
  id: number;
  userId: number;
  ip: string | undefined;
  token: string;
  createdAt: Date;
  updatedAt: Date;
};

export { type SessionCreateResponseDTO };
