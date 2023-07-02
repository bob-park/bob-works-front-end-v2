type CommonState = {
  alerts: SystemAlert[];
};

type SystemAlert = {
  level: 'info' | 'error' | 'warn';
  message: string;
  createAt: Date;
};
