export type ApiError = {
  error: string;
  errors?: { path: (string | number)[]; message: string }[];
};
